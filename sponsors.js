// Crop coordinates reference the supplied sponsor artwork at 2016 × 1243.
// Replace with individual logo files when original artwork becomes available.
(() => {
  const sponsors = [
    ['Old Friends', 140, 310, 200, 170],
    ['E&L Team at RE/MAX Elevate', 360, 310, 207, 300],
    ['The Goddard School', 100, 615, 457, 165],
    ['Got Game Sports', 600, 310, 775, 495, 'polygon(0 0, 79% 0, 79% 65%, 100% 65%, 100% 85%, 86% 100%, 60% 100%, 60% 91%, 0 91%)'],
    ['MC Homes', 1265, 310, 230, 270],
    ['Ascend Orthodontics', 1525, 305, 390, 425],
    ['OptiMindHealth', 170, 780, 550, 380],
    ["Paul’s Coffee & Tea", 745, 840, 385, 180],
    ['The Louisville Underground', 918, 1035, 247, 100],
    ['Art Major', 1295, 740, 315, 215],
    ['The Singing Cook', 1630, 810, 290, 120],
    ['Relish Food Hall / Pickleball', 1270, 975, 455, 190]
  ].map(([name, x, y, width, height, clip, url = null]) => ({ name, x, y, width, height, clip, url }));
  // Optional seventh value: verified website URL; use null for clip if unused.
  const section = document.createElement('section');
  section.className = 'fr-sponsors';
  section.setAttribute('aria-labelledby', 'fr-sponsor-title');
  section.innerHTML = '<div class="fr-section-top"><div><span class="fr-label">2025–2026 SPONSORS</span><h2 id="fr-sponsor-title">Thank you for supporting Fireside.</h2></div></div><div class="fr-sponsor-window"><div class="fr-sponsor-track"></div></div>';
  const group = document.createElement('ul');
  group.className = 'fr-sponsor-group';
  sponsors.forEach(({name, x, y, width, height, clip, url}) => {
    const item = document.createElement('li');
    const logo = document.createElement('span');
    const scale = Math.min(172 / width, 100 / height);
    logo.className = 'fr-sponsor-logo';
    logo.setAttribute('role', 'img');
    logo.setAttribute('aria-label', name);
    Object.assign(logo.style, {
      width: `${width * scale}px`, height: `${height * scale}px`,
      backgroundSize: `${2016 * scale}px ${1243 * scale}px`,
      backgroundPosition: `${-x * scale}px ${-y * scale}px`,
      clipPath: clip || 'none'
    });
    if (url) {
      const link = document.createElement('a');
      link.className = 'fr-sponsor-link';
      link.href = url;
      link.append(logo);
      item.append(link);
    } else {
      item.append(logo);
    }
    group.append(item);
  });
  const duplicate = group.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.querySelectorAll('a').forEach(link => { link.tabIndex = -1; });
  section.querySelector('.fr-sponsor-track').append(group, duplicate);
  document.getElementById('fr-home').append(section);
})();
