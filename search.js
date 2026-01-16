const sheetURL =
  "https://script.google.com/macros/s/AKfycbyX6BT_NRfXAdMaiPgxCKbQghbIx4TwpmNQAZz9JU-G99G9RFe8t_yWYtzqsBkbZsGndw/exec";

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
