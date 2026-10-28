document.addEventListener('DOMContentLoaded', () => {
  const puzzleGrid = document.getElementById('puzzle-grid');
  const keywordList = document.getElementById('keyword-list');
  const roundKicker = document.getElementById('roundKicker');
  const failCounter = document.getElementById('failCounter');
  const hintBtn = document.getElementById('hintBtn');
  const checkBtn = document.getElementById('checkBtn');
  const clearBtn = document.getElementById('clearBtn');
  const selectionCount = document.getElementById('selectionCount');
  const navPlayerName = document.getElementById('navPlayerName');

  const playPanel = document.getElementById('playPanel');
  const completionPanel = document.getElementById('completionPanel');
  const toast = document.getElementById('matrixToast');
  const hintModal = document.getElementById('hintModal');
  const hintCancelBtn = document.getElementById('hintCancelBtn');
  const hintConfirmBtn = document.getElementById('hintConfirmBtn');

  let participant = null;
  let gameData = null;
  let currentRoundIndex = 0;
  let foundIds = [];          // keyword ids already solved
  let hintedIds = [];         // keyword ids already revealed by a hint
  let foundWords = {};        // id -> revealed word
  let selected = new Set();   // cell indices currently picked
  let failCount = 0;
  let hintCount = 0;
  let startTime = null;
  let busy = false;

  const BASE_SCORE = 80;   // start-up points for Game 2

  let toastTimeout = null;

  function showToast(msg) {
    if (toastTimeout) clearTimeout(toastTimeout);
    toast.textContent = msg;
    toast.classList.add('is-show');
    toastTimeout = setTimeout(() => toast.classList.remove('is-show'), 3000);
  }

  function getParticipant() {
    try {
      return JSON.parse(sessionStorage.getItem('currentParticipant')) ||
             JSON.parse(sessionStorage.getItem('tuhaoviet_participant'));
    } catch (e) {
      return null;
    }
  }

  function saveFailCount() { sessionStorage.setItem('matrixFailCount', failCount); }
  function loadFailCount() {
    const saved = sessionStorage.getItem('matrixFailCount');
    if (saved !== null) failCount = parseInt(saved, 10) || 0;
  }
  function updateFailCounter() { failCounter.textContent = `Lỗi: ${failCount}`; }

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
    if (timeLeft <= 30) { el.style.color = '#830D13'; }
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

  // Time's up: record whatever has been solved so far, then end the game.
  async function handleTimeout() {
    if (timedOut) return;
    timedOut = true;
    busy = true;
    const el = document.getElementById('gameTimer');
    if (el) el.textContent = 'HẾT GIỜ';

    const round = gameData.rounds[currentRoundIndex] || { keywords: [] };
    let recorded = 0;
    try {
      const res = await fetch('/api/submit/timeout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId: participant.id,
          roundId: 'matrix-trung-hieu',
          solved: foundIds.length,
          total: round.keywords.length || 1,
          hintCount, failCount,
          duration: startTime ? Math.floor((Date.now() - startTime) / 1000) : TIME_LIMIT
        })
      });
      const data = await res.json();
      recorded = data.score || 0;
      if (data.participant) sessionStorage.setItem('currentParticipant', JSON.stringify(data.participant));
      showToast(`Hết giờ! Bạn tìm được ${foundIds.length}/${round.keywords.length} từ khóa — được ${recorded} điểm.`);
      const chip = document.getElementById('scoreChipVal');
      if (chip) chip.textContent = 'Điểm: ' + recorded;
    } catch (err) {
      showToast('Hết giờ! Không lưu được kết quả.');
    }

    // Don't reuse the "you found everything" congratulations copy on a timeout.
    const h = completionPanel.querySelector('h2');
    const p = completionPanel.querySelector('p');
    if (h) h.textContent = 'Hết giờ!';
    if (p) {
      p.textContent = `Bạn tìm được ${foundIds.length}/${round.keywords.length} từ khóa và được ${recorded} điểm. Kết quả đã được ghi nhận.`;
    }
    setTimeout(showCompletion, 1800);
  }

  // Live projected score: 100 − hints×10 − fails×3 (floor 0).
  function updateScoreChip() {
    const el = document.getElementById('scoreChipVal');
    if (!el) return;
    // Starts on the 80 point base, +20 per keyword found, minus penalties.
    // May dip below the base on screen; the recorded score never does.
    const score = BASE_SCORE + foundIds.length * 20 - hintCount * 10 - failCount * 3;
    el.textContent = 'Điểm: ' + score;
    el.style.color = score < BASE_SCORE ? '#830D13' : '';
  }

  async function init() {
    participant = getParticipant();
    if (!participant) { window.location.replace('/auth'); return; }
    navPlayerName.title = participant.fullName || participant.studentId;

    loadFailCount();
    updateFailCounter();
    updateScoreChip();

    try {
      const res = await fetch('/api/game/matrix');
      if (!res.ok) throw new Error('Failed to load matrix data');
      gameData = await res.json();

      // Re-check the server so a stale sessionStorage copy can't be used to replay.
      try {
        const pr = await (await fetch('/api/participants')).json();
        const fresh = (pr.participants || []).find(x => x.id === participant.id);
        if (fresh) {
          participant = fresh;
          sessionStorage.setItem('tuhaoviet_participant', JSON.stringify(fresh));
          sessionStorage.setItem('currentParticipant', JSON.stringify(fresh));
        }
      } catch (e) { /* offline: use cached participant */ }

      if (participant.completedRoundIds && participant.completedRoundIds.includes('matrix-trung-hieu')) {
        const chip = document.getElementById('scoreChipVal');
        const s = participant.scores ? participant.scores['matrix-trung-hieu'] : null;
        if (chip) chip.textContent = 'Điểm: ' + (s == null ? 0 : s);
        const tEl = document.getElementById('gameTimer');
        if (tEl) tEl.textContent = '--:--';
        showCompletion();
        return;
      }

      startTime = Date.now();
      loadRound(0);
      startTimer();
    } catch (err) {
      console.error(err);
      showToast('Lỗi tải dữ liệu. Vui lòng thử lại sau.');
    }
  }

  function loadRound(index) {
    if (index >= gameData.rounds.length) { finishGame(); return; }

    currentRoundIndex = index;
    foundIds = [];
    hintedIds = [];
    foundWords = {};
    selected.clear();

    const round = gameData.rounds[currentRoundIndex];
    roundKicker.textContent = `Ma trận ${round.roundNumber}: ${round.category}`;

    renderGrid(round.grid);
    renderKeywords(round.keywords);
    updateSelectionUI();
  }

  function renderGrid(gridArray) {
    puzzleGrid.innerHTML = '';
    const cols = gridArray[0].length;
    puzzleGrid.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;

    let fontSizeClass = 'text-headline-md';
    if (cols >= 12) fontSizeClass = 'text-body-lg';
    if (cols >= 15) fontSizeClass = 'text-body-md';

    gridArray.flat().forEach((char, i) => {
      const cell = document.createElement('div');
      cell.className = `grid-cell bg-surface-container-highest flex items-center justify-center font-headline-md ${fontSizeClass} text-on-surface font-bold cursor-pointer rounded`;
      cell.textContent = char;
      cell.dataset.index = i;
      cell.addEventListener('click', () => toggleCell(i, cell));
      puzzleGrid.appendChild(cell);
    });
  }

  // Clue-only list. The word itself is revealed only once the player finds it.
  function renderKeywords(keywords) {
    keywordList.innerHTML = '';
    keywords.forEach((kw, idx) => {
      const solved = foundIds.includes(kw.id);
      const li = document.createElement('li');
      li.id = `kw-${kw.id}`;
      li.className = 'font-body-md text-sm text-on-surface flex flex-col gap-1 bg-surface p-3 border border-outline-variant rounded transition-all duration-300';

      li.innerHTML = `
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-sm ${solved ? 'text-secondary' : 'text-outline-variant'}"
                style="font-variation-settings:'FILL' ${solved ? 1 : 0};">${solved ? 'check_circle' : 'radio_button_unchecked'}</span>
          <span class="font-label-sm text-xs uppercase tracking-wider ${solved ? 'text-secondary' : 'text-primary'} font-bold">
            Từ khóa ${idx + 1} · ${kw.length} chữ cái
          </span>
        </div>
        ${solved
          ? `<span class="tracking-widest font-black text-secondary text-base pl-6">${foundWords[kw.id] || ''}</span>`
          : `<span class="text-on-surface-variant leading-relaxed pl-6 italic">${kw.clue || ''}</span>`}
      `;
      keywordList.appendChild(li);
    });
  }

  function toggleCell(index, cell) {
    if (busy) return;
    if (cell.classList.contains('found')) return; // already part of a solved word

    if (selected.has(index)) {
      selected.delete(index);
      cell.classList.remove('picking');
    } else {
      selected.add(index);
      cell.classList.add('picking');
    }
    updateSelectionUI();
  }

  function updateSelectionUI() {
    if (selectionCount) selectionCount.textContent = `${selected.size} chữ cái`;
    if (checkBtn) checkBtn.disabled = selected.size === 0;
  }

  function clearSelection() {
    selected.forEach(i => {
      const c = puzzleGrid.children[i];
      if (c) c.classList.remove('picking');
    });
    selected.clear();
    updateSelectionUI();
  }

  async function checkSelection() {
    if (busy || selected.size === 0) return;
    busy = true;
    checkBtn.disabled = true;

    const round = gameData.rounds[currentRoundIndex];
    const cells = Array.from(selected);

    try {
      const res = await fetch('/api/game/matrix/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ round: round.roundNumber, cells })
      });
      const data = await res.json();

      if (data.match) {
        foundIds.push(data.id);
        foundWords[data.id] = data.word;
        data.cells.forEach(idx => {
          const c = puzzleGrid.children[idx];
          if (c) { c.classList.remove('picking', 'hinted'); c.classList.add('found'); }
        });
        selected.clear();
        updateSelectionUI();
        updateScoreChip();
        renderKeywords(round.keywords);
        showToast(`Chính xác! Từ khóa: ${data.word}`);

        if (foundIds.length === round.keywords.length) {
          setTimeout(() => {
            showToast(`Hoàn thành Ma trận ${round.roundNumber}!`);
            setTimeout(() => loadRound(currentRoundIndex + 1), 1500);
          }, 600);
        }
      } else {
        // Wrong selection: flash the picked cells, cost one mistake.
        cells.forEach(idx => {
          const c = puzzleGrid.children[idx];
          if (c) {
            c.classList.add('wrong-cell');
            setTimeout(() => c.classList.remove('wrong-cell'), 500);
          }
        });
        failCount++;
        saveFailCount();
        updateFailCounter();
        updateScoreChip();
        showToast('Chưa đúng — các chữ cái chưa tạo thành từ khóa nào (-3 điểm).');
        setTimeout(clearSelection, 500);
      }
    } catch (err) {
      console.error(err);
      showToast('Đã có lỗi xảy ra.');
    } finally {
      busy = false;
      updateSelectionUI();
    }
  }

  if (checkBtn) checkBtn.addEventListener('click', checkSelection);
  if (clearBtn) clearBtn.addEventListener('click', clearSelection);

  hintBtn.addEventListener('click', () => {
    hintModal.classList.remove('hidden');
    hintModal.classList.add('flex');
  });
  hintCancelBtn.addEventListener('click', () => {
    hintModal.classList.add('hidden');
    hintModal.classList.remove('flex');
  });

  hintConfirmBtn.addEventListener('click', async () => {
    hintModal.classList.add('hidden');
    hintModal.classList.remove('flex');

    hintBtn.disabled = true;
    const originalText = hintBtn.innerHTML;
    hintBtn.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Đang tìm...';

    try {
      const round = gameData.rounds[currentRoundIndex];
      const res = await fetch('/api/game/matrix/hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ round: round.roundNumber, foundIds, hintedIds })
      });
      const data = await res.json();

      const cells = Array.isArray(data.hintCells) ? data.hintCells : [];
      if (cells.length) {
        hintCount++;
        updateScoreChip();
        if (data.hintId && !hintedIds.includes(data.hintId)) hintedIds.push(data.hintId);
        // Highlight only the single revealed letter. Permanent highlight +
        // continuous shake come from the .hinted CSS class.
        cells.forEach(idx => {
          const c = puzzleGrid.children[idx];
          if (c && !c.classList.contains('found')) c.classList.add('hinted');
        });
        showToast('Gợi ý: chữ cái ĐẦU TIÊN của một từ khóa mới đang rung (-10 điểm).');
      } else {
        showToast('Đã gợi ý hết các từ khóa — không trừ điểm.');
      }
    } catch (err) {
      console.error(err);
      showToast('Không thể lấy gợi ý.');
    } finally {
      hintBtn.innerHTML = originalText;
      hintBtn.disabled = false;
    }
  });

  function showCompletion() {
    playPanel.classList.add('hidden');
    completionPanel.classList.remove('hidden');
    completionPanel.classList.add('flex');
  }

  async function finishGame() {
    clearInterval(timerInterval);
    try {
      const duration = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
      const res = await fetch('/api/submit/matrix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId: participant.id,
          duration: duration,
          hintUsedCount: hintCount,
          failCount: failCount
        })
      });
      const data = await res.json();
      if (data.completed) {
        if (data.participant) {
          sessionStorage.setItem('currentParticipant', JSON.stringify(data.participant));
        }
        showCompletion();
      }
    } catch (err) {
      console.error(err);
      showToast('Không thể lưu kết quả. Vui lòng thử lại.');
    }
  }

  init();
});
