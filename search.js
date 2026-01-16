const sheetURL =
  "https://script.google.com/macros/s/AKfycbzmh82OD2vp4Gb1UKvwaZx3uk66su2YfihSNj8sgQLLESsOUcLLnjCx0GuhiCSpr8w1rw/exec";

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
