document.addEventListener('DOMContentLoaded', () => {
  const state = {
    data: null,
    participant: null,
    stations: [],
    index: 0,
    cleared: {},        // stationId -> true
    pieces: {},         // stationId -> piece letter
    // per-station working selection:
    single: null,       // selected option index
    multi: new Set(),   // selected option indices
    order: [],          // ordered tile indices (order-two)
    stageFails: 0,
    failCount: 0,
    hintUsedCount: 0,
    startTime: null,
    toastTimer: null
  };

  const els = {
    navPlayerName: document.getElementById('navPlayerName'),
    gameTitle: document.getElementById('gameTitle'),
    gameSubtitle: document.getElementById('gameSubtitle'),
    stepBar: document.getElementById('step-bar'),
    stepNodes: document.getElementById('step-nodes'),
    pieceTray: document.getElementById('pieceTray'),
    stageStepBadge: document.getElementById('stageStepBadge'),
    stageInstruction: document.getElementById('stageInstruction'),
    stageBody: document.getElementById('stage-body'),
    stageInputArea: document.getElementById('stage-input-area'),
    hintBtn: document.getElementById('hintBtn'),
    submitStageBtn: document.getElementById('submitStageBtn'),
    stageContextBox: document.getElementById('stage-context-box'),
    stageContextText: document.getElementById('stageContextText'),
    playPanel: document.getElementById('playPanel'),
    completionPanel: document.getElementById('completionPanel'),
    completionMsg: document.getElementById('completionMsg'),
    finalCodeReveal: document.getElementById('finalCodeReveal'),
    finalScoreVal: document.getElementById('finalScoreVal'),
    toast: document.getElementById('challengeToast')
  };

  // ── Toast ──
  function showToast(message) {
    if (!els.toast) return;
    clearTimeout(state.toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add('is-show');
    state.toastTimer = setTimeout(() => els.toast.classList.remove('is-show'), 2800);
  }

  // ── Escape HTML ──
  function escapeHTML(value) {
    return String(value == null ? '' : value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  // Live projected score for this attempt: 200 − hints×15 − fails×5 (floor 80).
  function updateScoreChip() {
    const el = document.getElementById('scoreChipVal');
    if (!el) return;
    // Starts on the 100 point base and climbs with each station cleared
    // (200 spread over all stations), minus penalties.
    const total = state.stations.length || 1;
    const cleared = Object.keys(state.cleared).length;
    const score = BASE_SCORE + Math.round((cleared / total) * COMPLETION_POINTS)
      - state.hintUsedCount * 15 - state.failCount * 5;
    el.textContent = 'Điểm: ' + score;
    el.style.color = score < BASE_SCORE ? '#830D13' : '';
  }

  const BASE_SCORE = 100;        // start-up points for trò vượt trạm
  const COMPLETION_POINTS = 200; // spread across the stations

  // ── Countdown: 3 minute limit for this game ──
  const TIME_LIMIT = 180;
  let timeLeft = TIME_LIMIT;
  let timerInterval = null;
  let timedOut = false;

  function renderTimer() {
    const el = document.getElementById('gameTimer');
    if (!el) return;
    const m = Math.floor(timeLeft / 60), s = timeLeft % 60;
    el.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    if (timeLeft <= 30) el.style.color = '#830D13';
  }

  function startTimer() {
    clearInterval(timerInterval);
    timeLeft = TIME_LIMIT;
    renderTimer();
    timerInterval = setInterval(() => {
      timeLeft--;
      renderTimer();
      if (timeLeft <= 0) { clearInterval(timerInterval); handleTimeout(); }
    }, 1000);
  }

  // Time's up: record the stations cleared so far, then end the game.
  async function handleTimeout() {
    if (timedOut) return;
    timedOut = true;
    const el = document.getElementById('gameTimer');
    if (el) el.textContent = 'HẾT GIỜ';

    const total = state.stations.length || 1;
    const solved = Object.keys(state.cleared).length;
    let recorded = 0;
    try {
      const res = await fetch('/api/submit/timeout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId: state.participant?.id,
          roundId: 'thu-thach-tri-quoc',
          solved, total,
          hintCount: state.hintUsedCount,
          failCount: state.failCount,
          duration: state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : TIME_LIMIT
        })
      });
      const data = await res.json();
      recorded = data.score || 0;
      if (data.participant) {
        sessionStorage.setItem('tuhaoviet_participant', JSON.stringify(data.participant));
        sessionStorage.setItem('currentParticipant', JSON.stringify(data.participant));
      }
      showToast(`Hết giờ! Bạn qua ${solved}/${total} trạm — được ${recorded} điểm.`);
      const chip = document.getElementById('scoreChipVal');
      if (chip) chip.textContent = 'Điểm: ' + recorded;
    } catch (err) {
      showToast('Hết giờ! Không lưu được kết quả.');
    }

    setTimeout(() => {
      els.playPanel.style.display = 'none';
      els.completionPanel.classList.remove('hidden');
      els.completionPanel.classList.add('flex');
      if (els.finalCodeReveal) {
        els.finalCodeReveal.innerHTML = state.stations.map(s => {
          const piece = state.pieces[s.id];
          return `<span class="inline-flex w-10 h-12 items-center justify-center rounded border-2 ${piece ? 'bg-primary/10 border-primary text-primary' : 'border-dashed border-outline-variant text-outline-variant'} text-2xl font-black">${piece || '·'}</span>`;
        }).join('');
      }
      if (els.completionMsg) els.completionMsg.textContent = `Hết thời gian! Bạn đã vượt qua ${solved}/${total} trạm và thu được ${solved} mảnh ghép.`;
      if (els.finalScoreVal) els.finalScoreVal.textContent = `Điểm đạt được: ${recorded}/300`;
    }, 2000);
  }

  // ── Restore Participant ──
  function restoreParticipant() {
    const AUTH_KEY = 'tuhaoviet_participant';
    const GAME_KEY = 'currentParticipant';
    try {
      const p = JSON.parse(sessionStorage.getItem(AUTH_KEY)) ||
                JSON.parse(sessionStorage.getItem(GAME_KEY));
      if (p && p.id) {
        state.participant = p;
        if (els.navPlayerName) els.navPlayerName.title = p.fullName || p.studentId;
      }
    } catch (e) {
      window.location.replace('/auth');
    }
  }

  // ── Replay guard ──
  // Each game may only be played once; re-check the server so a stale
  // sessionStorage copy can't be used to replay a finished game.
  async function refreshParticipant() {
    try {
      const res = await fetch('/api/participants');
      const data = await res.json();
      const fresh = (data.participants || []).find(x => x.id === state.participant?.id);
      if (fresh) {
        state.participant = fresh;
        sessionStorage.setItem('tuhaoviet_participant', JSON.stringify(fresh));
        sessionStorage.setItem('currentParticipant', JSON.stringify(fresh));
      }
    } catch (e) { /* offline: use cached participant */ }
    return state.participant;
  }

  function showAlreadyCompleted(score) {
    clearInterval(timerInterval);
    const tEl = document.getElementById('gameTimer');
    if (tEl) tEl.textContent = '--:--';
    const chip = document.getElementById('scoreChipVal');
    if (chip) chip.textContent = 'Điểm: ' + (score == null ? 0 : score);

    els.playPanel.style.display = 'none';
    els.completionPanel.classList.remove('hidden');
    els.completionPanel.classList.add('flex');
    const h = els.completionPanel.querySelector('h2');
    if (h) h.textContent = 'Bạn đã hoàn thành trò vượt trạm';
    if (els.finalCodeReveal) els.finalCodeReveal.innerHTML = '';
    if (els.completionMsg) els.completionMsg.textContent = 'Bạn đã chơi trò vượt trạm trước đó. Mỗi trò chơi chỉ được chơi một lần.';
    if (els.finalScoreVal) els.finalScoreVal.textContent = `Điểm đạt được: ${score == null ? 0 : score}/200`;
  }

  // ── Fetch ──
  async function fetchChallenge() {
    const gp = await refreshParticipant();
    if (gp && Array.isArray(gp.completedRoundIds) && gp.completedRoundIds.includes('thu-thach-tri-quoc')) {
      showAlreadyCompleted(gp.scores ? gp.scores['thu-thach-tri-quoc'] : null);
      return;
    }
    try {
      const res = await fetch('/api/game/challenge');
      if (!res.ok) throw new Error('Không thể tải dữ liệu thử thách.');
      state.data = await res.json();
      state.stations = state.data.stations || [];

      if (els.gameTitle) els.gameTitle.textContent = state.data.title || 'Đường tới toàn thắng';
      if (els.gameSubtitle) els.gameSubtitle.textContent = state.data.subtitle || '';

      state.startTime = Date.now();
      renderStepBar();
      renderPieceTray();
      updateScoreChip();
      startTimer();
      showStation(0);
    } catch (err) {
      showToast(err.message);
      console.error(err);
    }
  }

  // ── Step Bar ──
  function renderStepBar() {
    const n = state.stations.length;
    const idx = state.index;
    const pct = n > 1 ? (idx / (n - 1)) * 100 : 0;
    if (els.stepBar) els.stepBar.style.width = `${pct}%`;

    els.stepNodes.innerHTML = state.stations.map((s, i) => {
      let circle;
      if (state.cleared[s.id]) {
        circle = `<div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-green-600 text-white border-2 border-green-600"><span class="material-symbols-outlined text-sm font-bold">check</span></div>`;
      } else if (i === idx) {
        circle = `<div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-primary text-on-primary border-2 border-primary">${i + 1}</div>`;
      } else {
        circle = `<div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs bg-surface-variant text-on-surface-variant border-2 border-surface-variant">${i + 1}</div>`;
      }
      const labelColor = (i === idx) ? 'text-primary' : (state.cleared[s.id] ? 'text-green-700' : 'text-on-surface-variant');
      return `
        <div class="z-10 flex flex-col items-center gap-1">
          ${circle}
          <span class="text-[9px] font-bold ${labelColor} uppercase text-center leading-tight max-w-[52px]">${escapeHTML(s.short || ('Trạm ' + (i + 1)))}</span>
        </div>
      `;
    }).join('');
  }

  // ── Piece Tray ──
  function renderPieceTray() {
    if (!els.pieceTray) return;
    const earned = state.stations.filter(s => state.pieces[s.id]).length;
    els.pieceTray.innerHTML = `
      <span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest mr-1">Mảnh ghép ${earned}/${state.stations.length}:</span>
      ${state.stations.map(s => {
        const piece = state.pieces[s.id];
        return `<span class="w-8 h-8 flex items-center justify-center rounded border-2 text-sm font-black ${piece ? 'border-primary bg-primary/10 text-primary' : 'border-dashed border-outline-variant text-outline-variant'}">${piece ? escapeHTML(piece) : '·'}</span>`;
      }).join('')}
    `;
  }

  // ── Reset per-station working selection ──
  function resetSelection() {
    state.single = null;
    state.multi = new Set();
    state.order = [];
    state.stageFails = 0;
  }

  // ── Show a station ──
  function showStation(index) {
    state.index = index;
    resetSelection();
    document.getElementById('stageHintText').hidden = true;
    document.getElementById('stageHintText').textContent = '';
    els.hintBtn.classList.add('hidden');
    els.stageContextBox.classList.add('hidden');

    const s = state.stations[index];
    if (!s) return;

    renderStepBar();

    els.stageStepBadge.textContent = `TRẠM ${index + 1}/${state.stations.length}: ${(s.title || '').toUpperCase()}`;
    els.stageInstruction.textContent = s.kicker || '';

    renderMedia(s);
    renderInput(s);

    if (state.cleared[s.id]) {
      showContextBox(s.context);
      els.submitStageBtn.innerHTML = (index === state.stations.length - 1)
        ? 'Hoàn thành thử thách <span class="material-symbols-outlined">celebration</span>'
        : 'Trạm tiếp theo <span class="material-symbols-outlined">arrow_forward</span>';
    } else {
      els.submitStageBtn.innerHTML = 'Kiểm tra đáp án <span class="material-symbols-outlined">arrow_forward</span>';
    }
  }

  // ── Media (decorative content above the answers) ──
  function renderMedia(s) {
    const m = s.media;
    if (!m) { els.stageBody.innerHTML = ''; return; }

    if (m.kind === 'rebus') {
      els.stageBody.innerHTML = `
        <div class="w-full max-w-lg flex items-center justify-center gap-4 flex-wrap bg-surface-container-high border border-outline p-6 shadow-inner mb-2">
          ${m.items.map(it => `
            <div class="flex flex-col items-center gap-2">
              <span class="text-5xl md:text-6xl leading-none">${escapeHTML(it.icon)}</span>
              ${it.label ? `<span class="text-xs font-bold text-on-surface-variant uppercase tracking-wide">${escapeHTML(it.label)}</span>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    } else if (m.kind === 'poem') {
      els.stageBody.innerHTML = `
        <div class="w-full max-w-lg bg-surface-container-high border border-outline p-6 md:p-8 italic text-lg leading-relaxed shadow-inner relative mb-2">
          <div class="absolute top-2 left-4 text-primary text-3xl font-bold opacity-10">“</div>
          <div class="flex flex-col gap-2 text-center text-on-surface">
            ${m.lines.map(l => `<p>${escapeHTML(l)}</p>`).join('')}
          </div>
        </div>
      `;
    } else if (m.kind === 'note') {
      els.stageBody.innerHTML = `
        <div class="w-full max-w-lg bg-surface-container-high border-l-4 border-secondary-fixed-dim p-5 md:p-6 shadow-inner mb-2 text-left">
          ${m.title ? `<h4 class="text-xs font-bold text-primary uppercase tracking-widest mb-2">${escapeHTML(m.title)}</h4>` : ''}
          <p class="font-body-md text-sm md:text-base text-on-surface leading-relaxed">${escapeHTML(m.text)}</p>
        </div>
      `;
    } else {
      els.stageBody.innerHTML = '';
    }
  }

  // ── Input area (answers), based on station type ──
  function renderInput(s) {
    const cleared = !!state.cleared[s.id];

    if (s.type === 'single' || s.type === 'multi') {
      els.stageInputArea.innerHTML = `
        <div class="w-full grid grid-cols-1 gap-3" id="optionGrid">
          ${s.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const selected = s.type === 'single' ? (state.single === i) : state.multi.has(i);
            const cls = selected ? 'border-primary bg-secondary-container/20 text-primary' : 'border-outline-variant hover:border-primary';
            return `
              <button type="button" aria-pressed="${selected}" data-opt="${i}" class="opt-btn group flex items-center gap-3 text-left p-4 border-2 ${cls} transition-all active:scale-[0.99] ${cleared ? 'pointer-events-none opacity-90' : ''}">
                <span class="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full border-2 border-primary text-primary font-bold text-sm ${selected ? 'bg-primary text-on-primary' : ''}">${letter}</span>
                <span class="font-body-md text-sm md:text-base text-on-surface">${escapeHTML(opt)}</span>
              </button>
            `;
          }).join('')}
        </div>
        ${s.type === 'multi' ? '<p class="text-xs text-on-surface-variant italic mt-3 text-center">Có thể chọn nhiều đáp án. Chọn tất cả các khối đúng.</p>' : ''}
      `;
      if (cleared) return;
      els.stageInputArea.querySelectorAll('.opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.dataset.opt, 10);
          if (s.type === 'single') {
            state.single = i;
          } else {
            if (state.multi.has(i)) state.multi.delete(i); else state.multi.add(i);
          }
          renderInput(s);
        });
      });

    } else if (s.type === 'order-two') {
      const parts = String(s.template || '___ ___').split('___');
      let blankNo = -1;
      const templateHtml = parts.map((part, i) => {
        let html = escapeHTML(part);
        if (i < parts.length - 1) {
          blankNo++;
          const tileIdx = state.order[blankNo];
          const filled = tileIdx !== undefined && tileIdx !== null;
          html += `<button type="button" data-blank="${blankNo}" class="blank-btn inline-flex items-center justify-center min-w-[110px] mx-1 px-3 py-1 border-2 ${filled ? 'border-primary bg-primary/10 text-primary font-bold' : 'border-dashed border-primary/60 text-on-surface-variant'} rounded align-middle ${cleared ? 'pointer-events-none' : ''}">${filled ? escapeHTML(s.tiles[tileIdx]) : '＿＿＿'}</button>`;
        }
        return html;
      }).join('');

      els.stageInputArea.innerHTML = `
        <div class="w-full bg-surface-container-high border border-outline p-5 md:p-6 shadow-inner mb-4 text-on-surface leading-loose text-center text-sm md:text-base">
          ${templateHtml}
        </div>
        <div class="w-full flex flex-wrap gap-3 justify-center" id="tileRow">
          ${s.tiles.map((t, i) => {
            const used = state.order.includes(i);
            return `<button type="button" data-tile="${i}" class="tile-btn px-4 py-2 border-2 rounded font-semibold text-sm transition-all active:scale-95 ${used ? 'border-outline-variant bg-surface-variant text-on-surface-variant opacity-50' : 'border-primary text-primary hover:bg-primary hover:text-on-primary'} ${cleared ? 'pointer-events-none' : ''}">${escapeHTML(t)}</button>`;
          }).join('')}
        </div>
        <p class="text-xs text-on-surface-variant italic mt-3 text-center">Nhấn thẻ từ để điền vào ô trống theo thứ tự. Nhấn vào ô đã điền để xóa.</p>
      `;
      if (cleared) return;

      els.stageInputArea.querySelectorAll('.tile-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.dataset.tile, 10);
          if (state.order.includes(i)) return;
          if (state.order.length >= 2) return;
          state.order.push(i);
          renderInput(s);
        });
      });
      els.stageInputArea.querySelectorAll('.blank-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const b = parseInt(btn.dataset.blank, 10);
          if (state.order[b] !== undefined) {
            state.order.splice(b, 1);
            renderInput(s);
          }
        });
      });
    } else {
      els.stageInputArea.innerHTML = '';
    }
  }

  function showContextBox(text) {
    els.stageContextBox.classList.add('hidden');
  }

  // ── Submit / advance ──
  async function checkAnswer() {
    const s = state.stations[state.index];
    if (!s) return;

    // Already cleared → advance or finish
    if (state.cleared[s.id]) {
      if (state.index < state.stations.length - 1) showStation(state.index + 1);
      else triggerCompletion();
      return;
    }

    const payload = {
      stationId: s.id,
      participantId: state.participant?.id,
      duration: state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0,
      hintUsedCount: state.hintUsedCount,
      failCount: state.failCount
    };

    if (s.type === 'single') {
      if (state.single === null) { showToast('Vui lòng chọn một đáp án.'); return; }
      payload.answer = state.single;
    } else if (s.type === 'multi') {
      if (state.multi.size === 0) { showToast('Vui lòng chọn ít nhất một khối.'); return; }
      payload.answers = Array.from(state.multi);
    } else if (s.type === 'order-two') {
      if (state.order.length < 2) { showToast('Vui lòng điền đủ hai chỗ trống.'); return; }
      payload.answers = state.order.slice();
    }

    try {
      els.submitStageBtn.disabled = true;
      els.submitStageBtn.textContent = 'Đang kiểm tra...';

      const res = await fetch('/api/submit/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Kiểm tra thất bại.');

      if (result.correct) {
        state.cleared[s.id] = true;
        if (result.piece) state.pieces[s.id] = result.piece;
        showToast(result.piece ? `Chính xác! Nhận mảnh ghép "${result.piece}".` : 'Chính xác!');

        if (result.final && result.participant) {
          const AUTH_KEY = 'tuhaoviet_participant';
          const GAME_KEY = 'currentParticipant';
          sessionStorage.setItem(AUTH_KEY, JSON.stringify(result.participant));
          sessionStorage.setItem(GAME_KEY, JSON.stringify(result.participant));
        }

        renderStepBar();
        renderPieceTray();
        renderInput(s); // lock inputs
        showContextBox(result.context || s.context);
        els.hintBtn.classList.add('hidden');
        els.submitStageBtn.innerHTML = (state.index === state.stations.length - 1)
          ? 'Hoàn thành thử thách <span class="material-symbols-outlined">celebration</span>'
          : 'Trạm tiếp theo <span class="material-symbols-outlined">arrow_forward</span>';
      } else {
        state.stageFails++;
        state.failCount++;
        updateScoreChip();
        showToast('Chưa chính xác. Hãy thử lại!');
        if (state.stageFails >= 2 && s.hint) els.hintBtn.classList.remove('hidden');
      }
    } catch (err) {
      showToast(err.message);
    } finally {
      els.submitStageBtn.disabled = false;
      const cur = state.stations[state.index];
      if (cur && !state.cleared[cur.id]) {
        els.submitStageBtn.innerHTML = 'Kiểm tra đáp án <span class="material-symbols-outlined">arrow_forward</span>';
      }
    }
  }

  // ── Hint ──
  function triggerHint() {
    const s = state.stations[state.index];
    if (!s || !s.hint) return;
    state.hintUsedCount++;
    updateScoreChip();
    const hintPanel = document.getElementById('stageHintText');
    hintPanel.textContent = `${s.hint} (−15 điểm)`;
    hintPanel.hidden = false;
    els.hintBtn.classList.add('hidden');
  }

  // ── Completion ──
  function triggerCompletion() {
    clearInterval(timerInterval);
    const finalScore = Math.max(BASE_SCORE, BASE_SCORE + COMPLETION_POINTS - state.hintUsedCount * 15 - state.failCount * 5);

    els.playPanel.style.display = 'none';
    els.completionPanel.classList.remove('hidden');
    els.completionPanel.classList.add('flex');

    if (els.finalCodeReveal) {
      const code = state.data.finalCode || '';
      els.finalCodeReveal.innerHTML = code.split('').map(ch =>
        ch === ' '
          ? '<span class="inline-block w-3"></span>'
          : `<span class="inline-flex w-10 h-12 md:w-12 md:h-14 items-center justify-center rounded bg-primary/10 border-2 border-primary text-primary text-2xl md:text-3xl font-black">${escapeHTML(ch)}</span>`
      ).join('');
    }

    if (els.completionMsg) {
      els.completionMsg.textContent = state.data.finalMessage ||
        'Chúc mừng bạn đã hoàn thành thử thách Đường tới toàn thắng!';
    }
    if (els.finalScoreVal) {
      els.finalScoreVal.textContent = `Điểm đạt được: ${finalScore}/200 · ${state.hintUsedCount} gợi ý · sai ${state.failCount} lần`;
    }

    let countdown = 6;
    const redirectMsg = document.createElement('p');
    redirectMsg.className = 'text-sm font-semibold text-on-surface-variant mt-6 italic';
    redirectMsg.innerHTML = 'Tự động về phòng chờ sau <span id="countdown-val" class="font-bold text-primary">6</span> giây...';
    const card = els.completionPanel.querySelector('.max-w-md');
    if (card) card.appendChild(redirectMsg);

    const interval = setInterval(() => {
      countdown--;
      const valSpan = document.getElementById('countdown-val');
      if (valSpan) valSpan.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(interval);
        window.location.href = '/lobby';
      }
    }, 1000);
  }

  els.submitStageBtn.addEventListener('click', checkAnswer);
  els.hintBtn.addEventListener('click', triggerHint);

  // ── Init ──
  restoreParticipant();
  fetchChallenge();
});
