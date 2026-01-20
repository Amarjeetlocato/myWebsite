// Feature page specific JS
document.addEventListener('DOMContentLoaded', ()=>{
  const pageContent = document.getElementById('pageContent');
  if (!pageContent) return;

  // Example: inject extra information specific to Feature
  pageContent.innerHTML = `
    <section class="mt-20">
      <h3>Feature specific info</h3>
      <p class="muted">This section is unique to Feature and lives in <code>assets/js/pages/feature.js</code>.</p>
    </section>
  `;
});