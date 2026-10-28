document.addEventListener('DOMContentLoaded', () => {
  const state = {
    data: null,
    participant: null,
    answers: {}, // Stores user inputs by row index: e.g. { 0: ['B', 'E', 'N'], 1: ... }
    correctRows: new Set(), // Set of rowIndices that are correct
    activeRowIndex: null,
    toastTimer: null,
    startTime: null,
    failCount: 0,
    hintCount: 0,
    hintedRows: new Set() // rowIndices whose hint has been revealed (charged once each)
  };

  const HINT_COST = 15;
  const FAIL_COST = 10;
  const BASE_SCORE = 100;     // start-up points for trò ô chữ
  const ROW_POINTS = 30;      // per across-row solved
  const KEYWORD_BONUS = 35;   // for the hidden column keyword

  // ── Countdown: 2 minute limit for this game ──
  const TIME_LIMIT = 120;
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

  // Time's up: record the rows solved so far, then end the game.
  async function handleTimeout() {
    if (timedOut) return;
    timedOut = true;
    if (questionDialog.open) questionDialog.close();
    const el = document.getElementById('gameTimer');
    if (el) el.textContent = 'HẾT GIỜ';

    const totalRows = (state.data && state.data.rows) ? state.data.rows.length : 1;
    const solved = state.correctRows.size;
    let recorded = 0;
    try {
      const res = await fetch('/api/submit/timeout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId: state.participant?.id,
          roundId: 'o-chu-tu-than',
          solved, total: totalRows,
          hintCount: state.hintCount,
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
      showToast(`Hết giờ! Bạn giải được ${solved}/${totalRows} hàng — được ${recorded} điểm.`);
      const chip = document.getElementById('scoreChipVal');
      if (chip) chip.textContent = 'Điểm: ' + recorded;
    } catch (err) {
      showToast('Hết giờ! Không lưu được kết quả.');
    }

    // Don't reuse the "you solved it" congratulations copy on a timeout.
    const hEl = els.completionPanel.querySelector('h2');
    const pEl = els.completionPanel.querySelector('p');
    if (hEl) hEl.textContent = 'Hết giờ!';
    if (pEl) {
      pEl.textContent = `Bạn giải được ${solved}/${totalRows} hàng ngang và được ${recorded} điểm. Kết quả đã được ghi nhận.`;
    }
    // Lock the board
    els.gridContainer.querySelectorAll('input').forEach(i => { i.disabled = true; });
    if (els.submitKeywordBtn) els.submitKeywordBtn.disabled = true;
    if (els.keywordInput) els.keywordInput.disabled = true;
    setTimeout(() => {
      els.playPanel.style.display = 'none';
      els.completionPanel.classList.remove('hidden');
      els.completionPanel.classList.add('flex');
    }, 2000);
  }

  // Live projected score for this attempt, shown in the header chip.
  function updateScoreChip() {
    const el = document.getElementById('scoreChipVal');
    if (!el) return;
    // 30 points per solved row, minus penalties (+35 bonus lands when the hidden
    // keyword is cracked). May go negative; the recorded score floors at 0.
    const score = BASE_SCORE + state.correctRows.size * ROW_POINTS
      - state.failCount * FAIL_COST - state.hintCount * HINT_COST;
    el.textContent = 'Điểm: ' + score;
    el.style.color = score < BASE_SCORE ? '#830D13' : '';
  }

  // The hidden keyword may only be attempted once EVERY across-row is solved.
  function updateKeywordLock() {
    if (!state.data) return;
    const total = state.data.rows.length;
    const solved = state.correctRows.size;
    const unlocked = solved >= total;

    if (els.keywordInput) {
      els.keywordInput.disabled = !unlocked;
      els.keywordInput.placeholder = unlocked ? 'Nhập từ khóa...' : 'Chưa mở khóa';
    }
    if (els.submitKeywordBtn) els.submitKeywordBtn.disabled = !unlocked;

    const note = document.getElementById('keywordLockNote');
    if (note) {
      note.innerHTML = unlocked
        ? `<span class="material-symbols-outlined" style="font-size:1rem;">lock_open</span> Đã mở khóa! Nhập từ khóa cột dọc để hoàn thành.`
        : `<span class="material-symbols-outlined" style="font-size:1rem;">lock</span> Cần giải đủ ${total} hàng ngang trước (đã giải ${solved}/${total}).`;
      note.style.color = unlocked ? '#704811' : '#6F5750';
    }
  }

  // Reveal one row's hint (charged once per row).
  function revealHint(rowIndex) {
    if (state.correctRows.has(rowIndex)) return;
    if (!state.hintedRows.has(rowIndex)) {
      state.hintedRows.add(rowIndex);
      state.hintCount++;
      updateScoreChip();
      showToast(`Đã mở gợi ý (−${HINT_COST} điểm).`);
    }
    renderClues();
  }

  const els = {
    navPlayerName: document.getElementById('navPlayerName'),
    gameSubtitle: document.getElementById('gameSubtitle'),
    gridContainer: document.getElementById('crossword-grid-container'),
    keywordInput: document.getElementById('keywordInput'),
    submitKeywordBtn: document.getElementById('submitKeywordBtn'),
    playPanel: document.getElementById('playPanel'),
    completionPanel: document.getElementById('completionPanel'),
    toast: document.getElementById('crosswordToast')
  };

  // ── Toast Utility ──
  function showToast(message) {
    if (!els.toast) return;
    clearTimeout(state.toastTimer);
    els.toast.textContent = message;
    els.toast.classList.add('is-show');
    state.toastTimer = setTimeout(() => els.toast.classList.remove('is-show'), 2800);
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
    if (h) h.textContent = 'Bạn đã hoàn thành trò ô chữ';
    const p = els.completionPanel.querySelector('p');
    if (p) p.innerHTML = `Bạn đã giải ô chữ này trước đó và được <strong>${score == null ? 0 : score}</strong> điểm. Mỗi trò chơi chỉ được chơi một lần.`;
  }

  // ── Fetch Crossword Data ──
  async function fetchCrossword() {
    const p = await refreshParticipant();
    if (p && Array.isArray(p.completedRoundIds) && p.completedRoundIds.includes('o-chu-tu-than')) {
      showAlreadyCompleted(p.scores ? p.scores['o-chu-tu-than'] : null);
      return;
    }
    try {
      const res = await fetch('/api/game/crossword');
      if (!res.ok) throw new Error('Không thể tải dữ liệu ô chữ.');
      state.data = await res.json();
      
      // Initialize answers structure
      state.data.rows.forEach(r => {
        state.answers[r.rowIndex] = Array(r.answerLength).fill('');
      });
      
      state.startTime = Date.now();
      state.failCount = 0;
      renderCrossword();
      updateScoreChip();
      updateKeywordLock();
      startTimer();
    } catch (err) {
      showToast(err.message);
      console.error(err);
    }
  }

  // ── Render Crossword Grid & Clues ──
  function renderCrossword() {
    if (!state.data) return;

    const rows = state.data.rows;
    const colIndex = state.data.hiddenKeywordColIndex;

    // 1. Calculate max columns to configure Grid layout
    let maxEndCol = 0;
    rows.forEach(r => {
      const startCol = colIndex - r.highlightCol;
      const endCol = startCol + r.answerLength;
      if (endCol > maxEndCol) maxEndCol = endCol;
    });

    // Configure CSS grid columns & rows on container
    els.gridContainer.style.display = 'grid';
    // Compact cells keep the answer workspace small even on a wide page.
    els.gridContainer.style.gridTemplateColumns = `8.5rem repeat(${maxEndCol}, 2.35rem)`;
    els.gridContainer.style.gridTemplateRows = `repeat(${rows.length}, 2.75rem)`;

    // Clear previous grid
    els.gridContainer.innerHTML = '';

    // 2. Generate cell inputs
    rows.forEach(r => {
      const startCol = colIndex - r.highlightCol;
      const questionButton = document.createElement('button');
      questionButton.type = 'button';
      questionButton.className = 'row-question-trigger';
      questionButton.style.gridRow = `${r.rowIndex + 1}`;
      questionButton.style.gridColumn = '1';
      questionButton.dataset.questionRow = r.rowIndex;
      questionButton.setAttribute('aria-haspopup', 'dialog');
      questionButton.setAttribute('aria-controls', 'rowQuestionDialog');
      questionButton.setAttribute('aria-label', `Xem câu hỏi hàng ${r.rowIndex + 1}`);
      questionButton.textContent = `${r.rowIndex + 1}. Xem câu hỏi`;
      questionButton.addEventListener('click', () => openRowQuestion(r.rowIndex));
      els.gridContainer.appendChild(questionButton);
      
      for (let i = 0; i < r.answerLength; i++) {
        const col = startCol + i;
        const isHighlighted = (col === colIndex); // Highlighted central key letters
        const isCorrect = state.correctRows.has(r.rowIndex);
        
        const input = document.createElement('input');
        input.type = 'text';
        input.maxLength = 1;
        // No text-size utility here — sizing is owned by #crossword-grid-container .crossword-input
        // so the glyph always stays proportional to the cell.
        input.className = `crossword-input w-full h-full rounded text-center font-bold uppercase ${isHighlighted ? 'highlighted border-secondary-container bg-secondary-container/10' : 'border-outline-variant'} ${isCorrect ? 'correct' : ''}`;
        input.style.gridRow = `${r.rowIndex + 1}`;
        input.style.gridColumn = `${col + 2}`;
        input.setAttribute('aria-label', `Hàng ${r.rowIndex + 1}, chữ ${i + 1}`);
        input.dataset.rowIndex = r.rowIndex;
        input.dataset.charIndex = i;
        
        // Load current letter
        input.value = state.answers[r.rowIndex][i] || '';
        
        // Disabled if row is already validated correct
        if (isCorrect) input.disabled = true;

        // Caret movement listeners
        input.addEventListener('input', (e) => handleCellInput(e, input, r.rowIndex, i));
        input.addEventListener('keydown', (e) => handleCellKeydown(e, input, r.rowIndex, i));
        input.addEventListener('focus', () => {
          state.activeRowIndex = r.rowIndex;
          highlightClue(r.rowIndex);
        });

        els.gridContainer.appendChild(input);
      }
    });

    // 3. Render Clues List
    renderClues();
  }

  // ── Handle Typing in Cell ──
  function handleCellInput(e, input, rowIndex, charIndex) {
    const val = input.value.trim().toUpperCase();
    state.answers[rowIndex][charIndex] = val;

    if (val.length === 1) {
      // Jump to next input in current row
      const nextInput = els.gridContainer.querySelector(`input[data-row-index="${rowIndex}"][data-char-index="${charIndex + 1}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  }

  // ── Handle Keydown in Cell (Backspace / Arrow keys) ──
  function handleCellKeydown(e, input, rowIndex, charIndex) {
    if (e.key === 'Backspace') {
      if (input.value === '') {
        // Jump to previous cell on Backspace if current cell is empty
        const prevInput = els.gridContainer.querySelector(`input[data-row-index="${rowIndex}"][data-char-index="${charIndex - 1}"]`);
        if (prevInput) {
          prevInput.value = '';
          state.answers[rowIndex][charIndex - 1] = '';
          prevInput.focus();
          e.preventDefault();
        }
      } else {
        state.answers[rowIndex][charIndex] = '';
      }
    } else if (e.key === 'ArrowRight') {
      const nextInput = els.gridContainer.querySelector(`input[data-row-index="${rowIndex}"][data-char-index="${charIndex + 1}"]`);
      if (nextInput) nextInput.focus();
    } else if (e.key === 'ArrowLeft') {
      const prevInput = els.gridContainer.querySelector(`input[data-row-index="${rowIndex}"][data-char-index="${charIndex - 1}"]`);
      if (prevInput) prevInput.focus();
    }
  }

  // Questions are opened beside their own row, rather than below the board.
  const questionDialog = document.getElementById('rowQuestionDialog');
  const questionAnswer = document.getElementById('rowQuestionAnswer');
  const questionStatus = document.getElementById('rowQuestionStatus');
  const questionCheck = document.getElementById('rowQuestionCheckBtn');
  const questionHint = document.getElementById('rowQuestionHint');
  const questionHintButton = document.getElementById('rowQuestionHintBtn');
  let dialogRow = null;
  let checkingRow = false;
  let returnFocus = null;

  function normalizeAnswer(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'D').toUpperCase().replace(/[^A-Z]/g, '');
  }

  function renderClues() {
    if (!state.data) return;
    state.data.rows.forEach(row => {
      const button = els.gridContainer.querySelector(`[data-question-row="${row.rowIndex}"]`);
      if (!button) return;
      const solved = state.correctRows.has(row.rowIndex);
      button.classList.toggle('is-solved', solved);
      button.textContent = `${row.rowIndex + 1}. ${solved ? 'Đã giải ✓' : 'Xem câu hỏi'}`;
      button.setAttribute('aria-label', `${solved ? 'Xem lại câu hỏi' : 'Xem câu hỏi'} hàng ${row.rowIndex + 1}${solved ? ', đã giải đúng' : ''}`);
    });
    if (questionDialog.open) refreshQuestion();
  }

  function highlightClue(rowIndex) {
    els.gridContainer.querySelectorAll('[data-question-row]').forEach(button => {
      button.classList.toggle('is-active', Number(button.dataset.questionRow) === rowIndex);
    });
  }

  function refreshQuestion() {
    const row = state.data.rows.find(item => item.rowIndex === dialogRow);
    if (!row) return;
    const solved = state.correctRows.has(dialogRow);
    questionAnswer.disabled = solved || checkingRow || timedOut;
    questionCheck.disabled = solved || checkingRow || timedOut;
    questionCheck.textContent = checkingRow ? 'Đang kiểm tra…' : solved ? 'Đã giải đúng ✓' : 'Kiểm tra đáp án';
    questionHintButton.hidden = solved || !row.hint;
    questionHintButton.disabled = checkingRow || timedOut || state.hintedRows.has(dialogRow);
    questionHintButton.textContent = state.hintedRows.has(dialogRow) ? 'Đã mở gợi ý' : 'Gợi ý (−15 điểm)';
    questionHint.hidden = !state.hintedRows.has(dialogRow);
    questionHint.textContent = state.hintedRows.has(dialogRow) ? row.hint : '';
  }

  function openRowQuestion(rowIndex) {
    if (timedOut || checkingRow) return;
    const row = state.data.rows.find(item => item.rowIndex === rowIndex);
    if (!row) return;
    dialogRow = rowIndex;
    state.activeRowIndex = rowIndex;
    returnFocus = els.gridContainer.querySelector(`[data-question-row="${rowIndex}"]`);
    highlightClue(rowIndex);
    document.getElementById('rowQuestionTitle').textContent = `Hàng ${rowIndex + 1} · ${row.answerLength} chữ cái`;
    document.getElementById('rowQuestionText').textContent = row.clue;
    questionAnswer.removeAttribute('maxlength');
    questionAnswer.value = state.answers[rowIndex].join('');
    questionStatus.textContent = state.correctRows.has(rowIndex) ? 'Bạn đã giải đúng hàng này.' : `${questionAnswer.value.length}/${row.answerLength} chữ cái`;
    questionStatus.style.color = '';
    questionDialog.showModal();
    refreshQuestion();
    if (!questionAnswer.disabled) questionAnswer.focus();
    else document.getElementById('closeRowQuestion').focus();
  }

  questionAnswer.addEventListener('input', () => {
    if (timedOut || checkingRow || state.correctRows.has(dialogRow)) return;
    const row = state.data.rows.find(item => item.rowIndex === dialogRow);
    const value = normalizeAnswer(questionAnswer.value).slice(0, row.answerLength);
    questionAnswer.value = value;
    state.answers[dialogRow] = Array.from({length:row.answerLength}, (_, i) => value[i] || '');
    els.gridContainer.querySelectorAll(`input[data-row-index="${dialogRow}"]`).forEach(input => {
      input.value = state.answers[dialogRow][Number(input.dataset.charIndex)];
    });
    questionStatus.textContent = `${value.length}/${row.answerLength} chữ cái`;
    questionStatus.style.color = '';
  });

  questionHintButton.addEventListener('click', () => {
    if (timedOut || checkingRow) return;
    revealHint(dialogRow);
    questionStatus.textContent = 'Đã mở gợi ý (−15 điểm).';
  });

  document.getElementById('rowQuestionForm').addEventListener('submit', async event => {
    event.preventDefault();
    if (checkingRow || timedOut || state.correctRows.has(dialogRow)) return;
    const row = state.data.rows.find(item => item.rowIndex === dialogRow);
    if (questionAnswer.value.length !== row.answerLength) {
      questionStatus.textContent = `Vui lòng nhập đủ ${row.answerLength} chữ cái.`;
      questionAnswer.focus();
      return;
    }
    checkingRow = true;
    refreshQuestion();
    questionStatus.textContent = 'Đang kiểm tra đáp án…';
    const previousFails = state.failCount;
    try {
      await verifyRow(dialogRow);
      if (timedOut) return;
      const correct = state.correctRows.has(dialogRow);
      questionStatus.textContent = correct ? 'Chính xác! Hàng ô chữ đã được hoàn thành.' : state.failCount > previousFails ? 'Chưa đúng. Bạn thử lại nhé! (−10 điểm)' : 'Chưa kiểm tra được đáp án. Bạn hãy thử lại.';
      questionStatus.style.color = correct ? '#155334' : '#96121a';
    } finally {
      checkingRow = false;
      refreshQuestion();
      if (questionDialog.open && !questionAnswer.disabled) questionAnswer.focus();
    }
  });
  document.getElementById('closeRowQuestion').addEventListener('click', () => questionDialog.close());
  questionDialog.addEventListener('click', event => {
    const bounds = questionDialog.getBoundingClientRect();
    if (event.target === questionDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) questionDialog.close();
  });
  questionDialog.addEventListener('close', () => {
    if (!timedOut && returnFocus?.isConnected) returnFocus.focus();
  });

  // ── Verify single crossword row via API ──
  async function verifyRow(rowIndex) {
    if (timedOut || state.correctRows.has(rowIndex)) return;
    const rowLetters = state.answers[rowIndex] || [];
    const word = rowLetters.join('').trim().toUpperCase();

    const rData = state.data.rows.find(r => r.rowIndex === rowIndex);
    if (word.length < rData.answerLength) {
      showToast(`Vui lòng điền đủ ${rData.answerLength} chữ cái.`);
      return;
    }

    try {
      const res = await fetch('/api/submit/crossword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'row',
          rowIndex,
          answer: word
        })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Kiểm tra thất bại.');
      if (timedOut) return;

      if (result.correct) {
        state.correctRows.add(rowIndex);
        updateScoreChip();
        updateKeywordLock();
        showToast(`Hàng ngang ${rowIndex + 1} chính xác!`);
        
        // Update cell styles to correct
        els.gridContainer.querySelectorAll(`input[data-row-index="${rowIndex}"]`).forEach(input => {
          input.classList.add('correct');
          input.disabled = true;
        });
        
        rData.context = result.context; // Save returned context definition
        renderClues();
        highlightClue(rowIndex);
      } else {
        state.failCount++;
        updateScoreChip();
        showToast(`Hàng ngang ${rowIndex + 1} chưa chính xác. Hãy kiểm tra lại!`);
      }
    } catch (err) {
      showToast(err.message);
    }
  }

  // ── Submit Secret Hidden Column Keyword ──
  async function submitKeyword() {
    const keyword = els.keywordInput.value.trim().toUpperCase();
    if (!keyword) {
      showToast('Vui lòng nhập từ khóa dự đoán.');
      return;
    }

    if (keyword.length !== state.data.hiddenKeywordLength) {
      showToast(`Từ khóa bí mật cột dọc phải gồm đúng ${state.data.hiddenKeywordLength} chữ cái.`);
      return;
    }

    try {
      els.submitKeywordBtn.disabled = true;
      els.submitKeywordBtn.textContent = 'Đang gửi...';

      const duration = state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0;
      const res = await fetch('/api/submit/crossword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'keyword',
          keyword,
          participantId: state.participant?.id,
          duration: duration,
          failCount: state.failCount,
          hintCount: state.hintCount,
          solvedRows: state.correctRows.size
        })
      });
      
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Nộp từ khóa thất bại.');

      if (result.correct) {
        clearInterval(timerInterval);
        // Update local storage participant status
        if (result.participant) {
          const AUTH_KEY = 'tuhaoviet_participant';
          const GAME_KEY = 'currentParticipant';
          sessionStorage.setItem(AUTH_KEY, JSON.stringify(result.participant));
          sessionStorage.setItem(GAME_KEY, JSON.stringify(result.participant));
        }
        
        // Trigger Completion display screen
        els.playPanel.style.display = 'none';
        els.completionPanel.classList.remove('hidden');
        els.completionPanel.classList.add('flex');
        showToast('Chúc mừng! Từ khóa bí mật hoàn toàn chính xác.');

        // Automagically redirect to game dashboard after 5 seconds
        let countdown = 5;
        const redirectMsg = document.createElement('p');
        redirectMsg.className = 'text-sm font-semibold text-on-surface-variant mt-6 italic';
        redirectMsg.innerHTML = 'Hệ thống sẽ tự động chuyển hướng về phòng chờ sau <span id="countdown-val" class="font-bold text-primary">5</span> giây...';
        els.completionPanel.querySelector('.max-w-md').appendChild(redirectMsg);
        
        const interval = setInterval(() => {
          countdown--;
          const valSpan = document.getElementById('countdown-val');
          if (valSpan) valSpan.textContent = countdown;
          if (countdown <= 0) {
            clearInterval(interval);
            window.location.href = '/lobby';
          }
        }, 1000);

      } else {
        state.failCount++;
        updateScoreChip();
        showToast('Từ khóa chưa chính xác. Gợi ý: Hãy quan sát các chữ cái giao nhau ở các hàng ngang đã đúng!');
      }
    } catch (err) {
      showToast(err.message);
    } finally {
      els.submitKeywordBtn.disabled = false;
      els.submitKeywordBtn.textContent = 'Gửi';
    }
  }

  els.submitKeywordBtn.addEventListener('click', submitKeyword);
  els.keywordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitKeyword();
  });

  // ── Init ──
  restoreParticipant();
  fetchCrossword();
});
