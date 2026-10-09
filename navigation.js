(() => {
  const header = document.querySelector('.fr-header');
  const toggle = header.querySelector('.fr-menu-toggle');
  const nav = document.getElementById('fr-main-nav');
  const donate = header.querySelector('.fr-support');
  const compact = window.matchMedia('(max-width: 960px)');

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.hidden = compact.matches && !open;
  }

  function syncBreakpoint() {
    const focused = document.activeElement;
    const focusInNav = nav.contains(focused);
    const focusOnToggle = document.activeElement === toggle;
    // Keep keyboard order aligned with the visible header at either size.
    if (compact.matches) header.append(nav);
    else header.insertBefore(nav, donate);
    toggle.hidden = !compact.matches;
    setOpen(false);
    if (compact.matches && focusInNav) toggle.focus();
    if (!compact.matches && focusInNav) focused.focus();
    if (!compact.matches && focusOnToggle) nav.querySelector('a').focus();
  }

  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => {
    if (!compact.matches || !event.target.closest('a')) return;
    setOpen(false);
    // The router moves focus to the new heading; keep same-page and external links safe too.
    toggle.focus();
  });
  header.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return;
    event.preventDefault();
    setOpen(false);
    toggle.focus();
  });
  document.addEventListener('click', event => {
    if (header.contains(event.target)) return;
    const focusInNav = nav.contains(document.activeElement);
    setOpen(false);
    if (compact.matches && focusInNav) toggle.focus();
  });
  window.addEventListener('hashchange', () => setOpen(false));
  compact.addEventListener('change', syncBreakpoint);
  header.classList.add('fr-navigation-ready');
  syncBreakpoint();
})();
