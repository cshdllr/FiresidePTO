(() => {
  const wear = window.FIRESIDE_DATA.fundraising.spiritWear;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const product = (index, extra = '') => `<div class="product ${extra}"><img src="${escape(wear.images[index].src)}" alt="${escape(wear.images[index].alt)}" decoding="async"></div>`;
  const action = '<span class="shop-label" aria-hidden="true">Shop spirit wear</span>';
  const copy = () => `<div class="wear-copy"><h2>Wear your Fireside pride</h2><p>${escape(wear.description)}</p>${action}</div>`;
  const looks = [
    { name: 'Editorial split', note: 'A clear message on the left, a generous product collection on the right. My pick for the homepage.', body: `${copy()}<div class="product-trio">${product(0)}${product(1)}${product(2)}</div>` },
    { name: 'Product shelf', note: 'A lighter, shop-like layout. Three equally sized products sit beneath a compact introduction.', body: `<div class="shelf-header"><div><h2>Wear your Fireside pride</h2><p>${escape(wear.description)}</p></div>${action}</div><div class="product-trio">${product(0)}${product(1)}${product(2)}</div>` },
    { name: 'Featured favorite', note: 'The sweatshirt leads, with two supporting products beside the message. A little more editorial.', body: `${product(0, 'featured-product')}<div class="feature-copy">${copy()}<div class="supporting-products">${product(1)}${product(2)}</div></div>` },
    { name: 'Compact ribbon', note: 'A short, quiet banner that leaves more room for events. Products lead; the action sits at the far end.', body: `<div class="product-trio">${product(0)}${product(1)}${product(2)}</div><div class="wear-copy"><h2>Wear your Fireside pride</h2><p>Falcons apparel for kids and adults.</p></div>${action}` },
    { name: 'Center stage', note: 'A centered message framed by merchandise. The most expressive option, with a softer background.', body: `<div class="left-products">${product(0)}</div>${copy()}<div class="right-products">${product(1)}${product(2)}</div>` }
  ];
  document.getElementById('studies').innerHTML = looks.map((look, i) => {
    const number = String(i + 1).padStart(2, '0');
    return `<section class="study" id="${number}" aria-labelledby="look-${number}"><header class="study-caption"><h2 id="look-${number}"><span>${number}</span>${look.name}</h2><p>${look.note}</p></header><a class="wear-card look-${number}" href="${escape(wear.url)}" target="_blank" rel="noopener" aria-label="Shop spirit wear — ${look.name}">${look.body}</a></section>`;
  }).join('');
})();
