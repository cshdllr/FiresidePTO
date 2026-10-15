(() => {
  // Keep both previews connected to the real homepage; no duplicated content or routes.
  document.querySelectorAll('iframe').forEach(frame => {
    frame.addEventListener('load', () => {
      const doc = frame.contentDocument;
      if (!doc?.querySelector('#fireside-refined')) return;
      const style = doc.createElement('style');
      style.textContent = '#fireside-refined { min-height: 0; }';
      if (frame.dataset.font === 'current') {
        const previous = doc.createElement('link');
        previous.rel = 'stylesheet';
        previous.href = 'font-comparison-previous.css';
        doc.head.append(previous);
      }
      doc.head.append(style);
      const resize = () => { frame.style.height = `${Math.ceil(doc.body.getBoundingClientRect().height)}px`; };
      new ResizeObserver(resize).observe(doc.body);
      doc.fonts.ready.then(resize);
      resize();
    });
    frame.src = 'index.html#home';
  });
  document.querySelectorAll('[data-view]').forEach(button => {
    if (button.tagName !== 'BUTTON') return;
    button.addEventListener('click', () => {
      document.querySelector('.comparison').dataset.view = button.dataset.view;
      document.querySelectorAll('button[data-view]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    });
  });
})();
