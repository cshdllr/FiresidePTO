(() => {
  'use strict';
  const root = document.getElementById('fireside-refined');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  const observedImages = new WeakSet();
  const grids = '[data-motion-group], .fr-event-grid, .fr-team-grid, .fr-resource-grid, .fr-committee-grid, .fr-fundraising-grid, .fr-detail-grid';
  let currentPage;

  function cancel() {
    for (const animation of running) animation.cancel();
    running.clear();
  }

  function animate(element, frames, options) {
    if (!element.animate || reduced.matches) return;
    const animation = element.animate(frames, options);
    running.add(animation);
    animation.onfinish = animation.oncancel = () => running.delete(animation);
  }

  function settings() {
    const style = getComputedStyle(root);
    return {
      duration: parseFloat(style.getPropertyValue('--fr-motion-enter')) || 360,
      fast: parseFloat(style.getPropertyValue('--fr-motion-fast')) || 180,
      stagger: parseFloat(style.getPropertyValue('--fr-motion-stagger')) || 40,
      easing: style.getPropertyValue('--fr-motion-ease').trim() || 'ease-out'
    };
  }

  function enter(page, { contentOnly = false } = {}) {
    cancel();
    currentPage = page;
    const timing = settings();
    // Loading images never hold up text or navigation. Cached images need no extra reveal.
    page.querySelectorAll('img').forEach(img => {
      if (observedImages.has(img) || img.complete) return;
      observedImages.add(img);
      img.addEventListener('load', () => {
        if (currentPage !== page || page.hidden || !img.naturalWidth) return;
        animate(img, [{ opacity: 0 }, { opacity: 1 }], { duration: timing.fast, easing: timing.easing });
      }, { once: true });
    });
    if (reduced.matches) return;

    const targets = [];
    for (const child of page.children) {
      if (contentOnly && child.matches('.fr-simple-intro, .fr-back')) continue;
      const grid = child.matches(grids) ? child : child.querySelector(grids);
      if (grid) targets.push(...grid.children);
      else if (child.matches('.fr-events')) targets.push(...child.children);
      else targets.push(child);
    }
    let index = 0;
    for (const target of targets) {
      const rect = target.getBoundingClientRect();
      // Keep the focused heading and offscreen content fully visible and stationary.
      if (target.contains(document.activeElement) || !rect.height || rect.bottom <= 0 || rect.top >= window.innerHeight) continue;
      animate(target, [
        { opacity: 0, transform: contentOnly ? 'none' : 'translateY(8px)' },
        { opacity: 1, transform: 'none' }
      ], {
        duration: contentOnly ? timing.fast : timing.duration,
        delay: contentOnly ? 0 : Math.min(index++, 3) * timing.stagger,
        easing: timing.easing,
        fill: 'backwards'
      });
    }
  }

  // Interaction takes priority over decoration; cancellation restores normal styles.
  root.addEventListener('focusin', cancel);
  reduced.addEventListener('change', cancel);
  window.FiresideMotion = { enter, cancel };
})();
