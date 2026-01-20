// Shared footer injector (dynamic + translatable)
(function(){
  function build(){
    const container = document.getElementById('siteFooter') || document.createElement('div');
    container.id = 'siteFooter';

    // compute icons base relative to this script so paths work from nested pages
    const s = document.currentScript || document.querySelector('script[src*="footer.js"]');
    const iconsBase = s ? new URL('../icons/', s.src).href : 'assets/icons/';

    container.innerHTML = `
      <footer class="footer">
        <div class="container footer-grid">
          <div class="col">
            <div class="footer-brand">WHOAMI</div>
            <div data-i18n="footer.copy">Providing free IT products and services for India</div>
            <div class="socials mt-10">
              <a href="https://youtube.com/" target="_blank" rel="noopener" aria-label="YouTube" data-brand="youtube"><img src="${iconsBase}youtube.svg" alt="YouTube"></a>
              <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="Instagram" data-brand="instagram"><img src="${iconsBase}instagram.svg" alt="Instagram"></a>
              <a href="https://facebook.com/" target="_blank" rel="noopener" aria-label="Facebook" data-brand="facebook"><img src="${iconsBase}facebook.svg" alt="Facebook"></a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn" data-brand="linkedin"><img src="${iconsBase}linkedin.svg" alt="LinkedIn"></a>
              <a href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter" data-brand="twitter"><img src="${iconsBase}twitter.svg" alt="Twitter"></a>
            </div>
          </div>
          <div>
            <div class="footer-contact-title">Contact</div>
            <div class="mt-8"><a href="mailto:whoami.tech@gmail.com?subject=Business inquiry" data-i18n-attr="href" data-i18n-attr-key="footer.contact">whoami.tech@gmail.com</a></div>
            <div class="mt-12 small muted" data-i18n="footer.copy">© WHOAMI — Free IT solutions for India</div>
          </div>
        </div>
      </footer>`;

    if (!document.getElementById('siteFooter')) document.body.appendChild(container);
  }

  document.addEventListener('DOMContentLoaded', ()=>{ build(); if (window.t) window.t(); if (window.applyI18n) window.applyI18n();
    // ensure t() is called to localize footer
    if (window.t) { document.querySelectorAll('#siteFooter [data-i18n]').forEach(el=>{ const k=el.getAttribute('data-i18n'); el.textContent = window.t(k); }); }
  });
})();