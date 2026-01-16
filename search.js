const sheetURL =
  "https://script.google.com/macros/s/AKfycbwveKQy_4qFzO1TgMuIiBFT-qvbPK-a5nXowpkuFlYy48vkSFCwiyTr_DmRXmST4RhHwA/exec";

function formatEmail(email) {
  return email.toLowerCase().replace(/@/g, "_").replace(/\./g, "_");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("username").value.trim();
    if (!email) return;

    const user = formatEmail(email);

    // ✅ URL based redirect
    window.location.href = `profile.html?user=${encodeURIComponent(user)}`;
  });
});
