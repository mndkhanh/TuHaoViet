import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'tuhaoviet-admin-'));
const password=crypto.randomBytes(24).toString('hex');
const auth='Basic '+Buffer.from('admin:'+password).toString('base64');
let server;
async function start(secret=password, version='test-1') {
  server=spawn(process.execPath,['be/server.js'],{cwd:root,env:{...process.env,PORT:'3089',DATA_DIR:temp,ADMIN_PASSWORD:secret,ADMIN_USERNAME:'admin',FLY_MACHINE_VERSION:version},stdio:['ignore','pipe','pipe']});
  await new Promise((resolve,reject)=>{server.stdout.once('data',resolve);server.once('error',reject);server.once('exit',code=>reject(new Error(`Server exited ${code}`)));});
}
async function stop(){if(server){const current=server;await new Promise(resolve=>{current.once('exit',resolve);current.kill();});server=null;}}
const request=(url,options={})=>fetch('http://localhost:3089'+url,options);
const file=path.join(temp,'participants.json');
try {
  await start();
  const registered=await (await request('/api/register',{method:'POST',body:JSON.stringify({fullName:'Disposable admin test',studentId:'ADMIN-TEST'})})).json();
  assert(registered.participant.id);
  const original=fs.readFileSync(file,'utf8');
  await stop();await start(password,'test-2');
  assert.equal(fs.readFileSync(file,'utf8'),original,'New deployment must preserve users');
  for(const route of ['/admin','/admin/','/admin.html','/api/admin/status']) assert.equal((await request(route)).status,401);
  assert.equal((await request('/admin',{headers:{Authorization:'Basic '+Buffer.from('admin:wrong').toString('base64')}})).status,401);
  const page=await request('/admin',{headers:{Authorization:auth}});assert.equal(page.status,200);assert.equal(page.headers.get('cache-control'),'no-store');assert.match(page.headers.get('content-security-policy'),/frame-ancestors 'none'/);
  assert(!(await page.text()).includes(password));
  const stats=await request('/api/admin/status',{headers:{Authorization:auth}});assert.equal((await stats.json()).participantCount,1);assert.equal(stats.headers.get('access-control-allow-origin'),null);
  assert.equal((await request('/api/participants/'+registered.participant.id,{method:'DELETE'})).status,401);
  assert.equal((await request('/api/admin/participants',{method:'DELETE',headers:{Authorization:auth}})).status,403);
  const headers={Authorization:auth,'Content-Type':'application/json','X-Admin-Action':'clear-participants'};
  assert.equal((await request('/api/admin/participants',{method:'DELETE',headers:{...headers,Origin:'https://untrusted.invalid'},body:JSON.stringify({confirmation:'XOA TAT CA'})})).status,403);
  assert.equal((await request('/api/admin/participants',{method:'DELETE',headers,body:JSON.stringify({confirmation:'wrong'})})).status,400);
  assert.equal(fs.readFileSync(file,'utf8'),original,'Rejected requests must not change users');
  const aborter=new AbortController();
  const live=await request('/api/leaderboard/live',{signal:aborter.signal});const reader=live.body.getReader();await reader.read();
  const cleared=await request('/api/admin/participants',{method:'DELETE',headers,body:JSON.stringify({confirmation:'XOA TAT CA'})});
  assert.equal(cleared.status,200);assert.equal((await cleared.json()).deletedCount,1);
  assert.deepEqual(JSON.parse(fs.readFileSync(file,'utf8')),{participants:[]});
  assert.match(new TextDecoder().decode((await reader.read()).value),/data: \[\]/);aborter.abort();
  assert.deepEqual((await (await request('/api/attempts')).json()).attempts,[]);
  assert((await (await request('/api/game/quiz')).json()).questions.length>0);
  await stop();await start('');
  assert.equal((await request('/admin',{headers:{Authorization:auth}})).status,503);
  console.log('PASS: admin authentication, fail-closed configuration, protected deletion, CSRF checks, typed confirmation, clearing isolated test data, live leaderboard reset, and persistence across deployments.');
} finally {await stop();}
