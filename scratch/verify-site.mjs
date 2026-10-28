import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'..');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'tuhaoviet-check-'));
const env={...process.env,PORT:'3088',DATA_DIR:temp};
for(const key of ['FLY_APP_NAME','FLY_MACHINE_VERSION','FLY_IMAGE_REF']) delete env[key];
const server=spawn(process.execPath,['be/server.js'],{cwd:root,env,stdio:['ignore','pipe','pipe']});
try {
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>reject(new Error(`Server exited: ${code}`)));});
  const get=async route=>{const response=await fetch('http://localhost:3088'+route);assert.equal(response.status,200,route);return response;};
  const post=async(route,body)=>{const response=await fetch('http://localhost:3088'+route,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});assert.equal(response.status,200,route);return response.json();};
  for(const route of ['/','/auth','/lobby','/quiz','/crossword','/challenge','/leaderboard','/assets/tuhaoviet-hero.png','/tuhaoviet.css','/landing.js','/mobile.css','/mobile.js','/crossword-dialog.css']) await get(route);
  for(const file of fs.readdirSync(path.join(root,'fe')).filter(name=>name.endsWith('.html'))) {
    const html=fs.readFileSync(path.join(root,'fe',file),'utf8');
    for(const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) if(match[1].trim()) new vm.Script(match[1],{filename:file});
    assert.deepEqual(fs.readFileSync(path.join(root,'fe',file)),fs.readFileSync(path.join(root,'be/public',file)));
  }
  const {participant}=await post('/api/register',{fullName:'Local verification',studentId:'TEST-ONLY'});
  const load=name=>JSON.parse(fs.readFileSync(path.join(root,'be/data',name),'utf8'));
  for(const game of ['quiz','crossword','challenge']) {
    const data=await (await get('/api/game/'+game)).json();
    const serialized=JSON.stringify(data);assert(!/"answers?"\s*:/.test(serialized),`Answer key exposed in ${game}`);
  }
  const quiz=load('game1-quiz.json');
  const result=await post('/api/submit/quiz',{participantId:participant.id,answers:Object.fromEntries(quiz.questions.map(q=>[q.id,q.answer])),duration:30});assert.equal(result.score,100);
  const crossword=load('game3-crossword.json');
  assert.equal(crossword.rows.map(r=>r.answer[r.highlightCol]).join(''),crossword.hiddenKeyword);
  for(const row of crossword.rows) assert.equal((await post('/api/submit/crossword',{type:'row',rowIndex:row.rowIndex,answer:row.answer})).correct,true);
  assert.equal((await post('/api/submit/crossword',{type:'keyword',keyword:crossword.hiddenKeyword,solvedRows:crossword.rows.length,participantId:participant.id,duration:50})).correct,true);
  for(const station of load('game4-challenge.json').stations) assert.equal((await post('/api/submit/challenge',{stationId:station.id,answer:station.answer,answers:station.answers,participantId:participant.id,duration:60})).correct,true);
  const players=await (await get('/api/participants')).json();assert.equal(players.participants[0].completedRoundIds.length,3);
  for (const route of ['/api/game/matrix','/api/game/matrix/check','/api/game/matrix/hint','/api/submit/matrix']) {
    const res=await fetch('http://localhost:3088'+route,{method:route==='/api/game/matrix'?'GET':'POST'});assert.equal(res.status,410);
  }
  const oldRoute=await fetch('http://localhost:3088/matrix',{redirect:'manual'});assert.equal(oldRoute.status,302);
  const playerFile=path.join(temp,'participants.json');
  const stored=JSON.parse(fs.readFileSync(playerFile,'utf8'));
  stored.participants[0].scores['matrix-trung-hieu']=160;
  stored.participants[0].durations['matrix-trung-hieu']=40;
  stored.participants[0].completedRoundIds.push('matrix-trung-hieu');
  fs.writeFileSync(playerFile,JSON.stringify(stored));
  const projected=(await (await get('/api/participants')).json()).participants[0];
  assert.equal(projected.totalRounds,3);assert.equal(projected.completedRoundCount,3);
  assert.equal(projected.scores['matrix-trung-hieu'],undefined);assert.equal(projected.totalScore,685);
  console.log('PASS: routes, assets, inline scripts, frontend copies, hidden answer keys, three complete game flows, removed matrix routes, and crossword keyword. Runtime data isolated in OS temp directory.');
} finally { server.kill(); }
