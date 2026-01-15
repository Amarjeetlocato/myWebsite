const sheetURL =
  "https://script.google.com/macros/s/AKfycbwXafkf6E5czgrP0oL0WEmgmDaDuKuKtFz7RIM-5MmmJcrAFR8EPSmWg7vPAy1q7K3BQA/exec";

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
