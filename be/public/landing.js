'use strict';
// Returning players go straight to the lobby; new players enter registration.
try {
  const player = JSON.parse(sessionStorage.getItem('tuhaoviet_participant')) ||
    JSON.parse(sessionStorage.getItem('currentParticipant'));
  if (player && player.id) {
    document.querySelectorAll('[data-play]').forEach(link => { link.href = '/lobby'; });
  }
} catch { /* Invalid session: retain the registration link. */ }