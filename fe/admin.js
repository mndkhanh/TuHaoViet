'use strict';
const count = document.getElementById('participantCount');
const status = document.getElementById('adminStatus');
const confirmation = document.getElementById('clearConfirmation');
const clearButton = document.getElementById('clearDataButton');
const refreshButton = document.getElementById('refreshAdmin');
let busy = false;
function updateButton() { clearButton.disabled = busy || confirmation.value !== 'XOA TAT CA'; }
async function refreshCount() {
  refreshButton.disabled = true;
  try {
    const response = await fetch('/api/admin/status', { cache: 'no-store', credentials: 'same-origin' });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Không tải được dữ liệu.');
    count.textContent = data.participantCount;
  } catch (error) { status.textContent = error.message; }
  finally { refreshButton.disabled = false; }
}
confirmation.addEventListener('input', updateButton);
refreshButton.addEventListener('click', refreshCount);
document.getElementById('clearDataForm').addEventListener('submit', async event => {
  event.preventDefault();
  if (busy || confirmation.value !== 'XOA TAT CA') return;
  busy = true; updateButton(); confirmation.disabled = true;
  clearButton.textContent = 'Đang xóa…'; status.textContent = '';
  try {
    const response = await fetch('/api/admin/participants', {
      method: 'DELETE', credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Action': 'clear-participants' },
      body: JSON.stringify({ confirmation: confirmation.value })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Không xóa được dữ liệu.');
    count.textContent = '0'; confirmation.value = '';
    for (const key of ['tuhaoviet_participant', 'currentParticipant']) sessionStorage.removeItem(key);
    status.textContent = `${data.message} Đã xóa ${data.deletedCount} người chơi.`;
  } catch (error) { status.textContent = error.message; }
  finally { busy = false; confirmation.disabled = false; clearButton.textContent = 'Xóa toàn bộ dữ liệu'; updateButton(); }
});
refreshCount();
