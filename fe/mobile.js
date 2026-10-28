'use strict';
// iOS and Android can shrink the visual viewport without resizing the layout.
// Keep the crossword dialog within the visible area above the keyboard.
(() => {
  const dialog = document.getElementById('rowQuestionDialog');
  if (!dialog || !window.visualViewport) return;
  function fitDialog() {
    if (!dialog.open) return;
    dialog.style.setProperty('--dialog-viewport-top', `${window.visualViewport.offsetTop + 12}px`);
    dialog.style.setProperty('--dialog-viewport-height', `${Math.max(160, window.visualViewport.height - 24)}px`);
    requestAnimationFrame(() => {
      if (dialog.open && dialog.contains(document.activeElement)) {
        document.activeElement.scrollIntoView({block: 'nearest', inline: 'nearest'});
      }
    });
  }
  window.visualViewport.addEventListener('resize', fitDialog);
  new MutationObserver(fitDialog).observe(dialog, {attributes: true, attributeFilter: ['open']});
})();
