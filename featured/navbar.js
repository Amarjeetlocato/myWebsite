// Shared navbar injector (dynamic + translatable)
(function(){
  const s = document.currentScript || document.querySelector('script[src*="navbar.js"]');
  const scriptSrc = s ? s.src : '';
  const homeHref = s ? new URL('../index.html', scriptSrc).href : 'index.html';
  const productsHref = s ? new URL('../products.html', scriptSrc).href : 'products.html';
  const registerHref = 'https://forms.gle/REPLACE_WITH_YOUR_FORM';
  const mailtoHref = 'mailto:whoami.tech@gmail.com?subject=Site inquiry';

  const container = document.getElementById('siteHeader') || document.createElement('div');
  container.id = 'siteHeader';

  // Build header HTML
  container.innerHTML = `
    <header class="header">
      <div class="header-inner container">
        <div class="brand">
          <div class="logo">W</div>
          <div>WHOAMI</div>
        </div>
        <nav class="nav-links">
          <a href="${homeHref}" data-i18n="nav.home">Home</a>
          <a href="${productsHref}" data-i18n="nav.products">Products</a>
        </nav>
        <div class="controls">
          <a class="btn" href="${registerHref}" target="_blank">Register</a>
          <a class="btn" href="${mailtoHref}">Feedback</a>
          <button id="themeToggle">🌙</button>
        </div>
      </div>
    </header>
  `;

  // Insert at top if not present
  if (!document.querySelector('header.header')) document.body.prepend(container);

  // Mark current nav link
  try {
    const locPath = location.pathname.replace(/\/+$|\/index\.html$/,'');
    document.querySelectorAll('#siteHeader a').forEach(a=>{
      try{
        const aPath = new URL(a.href).pathname.replace(/\/+$|\/index\.html$/,'');
        if (aPath === locPath) a.setAttribute('aria-current', 'page');
      } catch(e){}
    });
  } catch(e){}

  // Localize header after i18n is available
  document.addEventListener('DOMContentLoaded', ()=>{
    if (window.applyI18n) window.applyI18n();
    if (window.t) { document.querySelectorAll('#siteHeader [data-i18n]').forEach(el=>{ const k=el.getAttribute('data-i18n'); el.textContent = window.t(k); }); }
  });
})();