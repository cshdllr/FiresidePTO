(() => {
  const frame=document.getElementById('homepage');
  let look='editorial';
  const notes={
    current:'Current layout and 24px event spacing, for comparison.',
    editorial:'Recommended · Keeps the editorial split and all three products, with smaller images and a shorter message.',
    ribbon:'A lighter background and a single horizontal product row make the promotion feel quieter.',
    feature:'One sweatshirt gives the message a clear focus and removes the visual weight of three product tiles.',
    shelf:'A low product shelf with the message and shop action in one row above it. All three products stay visible.'
  };
  const styles=`
    #fireside-refined { min-height: 0; }
    #fireside-refined[data-study]:where(:not([data-study="current"])) #fr-home > .fr-event-grid {
      gap:32px; padding-bottom:32px;
      grid-template-columns:repeat(auto-fit,minmax(min(100%,max(220px,calc((100% - 64px)/3))),1fr));
    }
    #fireside-refined[data-study]:where(:not([data-study="current"])) #fr-home > .fr-mobile-section-action { margin-bottom:32px; }
    #fireside-refined[data-study]:where(:not([data-study="current"])) .fr-spirit { --fr-inset:24px; padding:24px; padding-left:32px; gap:32px; }
    #fireside-refined[data-study]:where(:not([data-study="current"])) .fr-spirit p { margin:8px 0 16px; }
    #fireside-refined[data-study]:where(:not([data-study="current"])) .fr-spirit-product { aspect-ratio:auto; height:144px; }
    #fireside-refined[data-study]:where(:not([data-study="current"])) .fr-spirit-product:nth-child(2) { margin-top:0; }
    #fireside-refined[data-study="editorial"] .fr-spirit { grid-template-columns:1fr minmax(0,420px); }
    #fireside-refined[data-study="editorial"] .fr-spirit-product:nth-child(2) { margin-top:12px; }
    #fireside-refined[data-study="ribbon"] .fr-spirit { grid-template-columns:1fr minmax(0,340px); background:var(--fr-wash); color:var(--fr-text); box-shadow:none; }
    #fireside-refined[data-study="ribbon"] .fr-spirit p { color:var(--fr-muted); }
    #fireside-refined[data-study="ribbon"] .fr-spirit .fr-primary { background:var(--fr-solid); color:var(--fr-solid-text); }
    #fireside-refined[data-study="ribbon"] .fr-spirit-product { height:120px; }
    #fireside-refined[data-study="feature"] .fr-spirit { grid-template-columns:144px 1fr; }
    #fireside-refined[data-study="feature"] .fr-spirit-products { grid-column:1;grid-row:1;grid-template-columns:1fr; }
    #fireside-refined[data-study="feature"] .fr-spirit-product:not(:first-child) { display:none; }
    #fireside-refined[data-study="feature"] .fr-spirit-copy { display:grid;grid-template-columns:1fr auto;column-gap:24px;align-items:center; }
    #fireside-refined[data-study="feature"] .fr-spirit-copy p { grid-column:1;margin-bottom:0; }
    #fireside-refined[data-study="feature"] .fr-primary { grid-column:2;grid-row:1/3; }
    #fireside-refined[data-study="shelf"] .fr-spirit { grid-template-columns:1fr;gap:16px;background:var(--fr-wash);color:var(--fr-text);box-shadow:none; }
    #fireside-refined[data-study="shelf"] .fr-spirit-copy { display:flex;align-items:center;justify-content:space-between;gap:24px; }
    #fireside-refined[data-study="shelf"] .fr-spirit-copy p { display:none; }
    #fireside-refined[data-study="shelf"] .fr-spirit-product { height:96px;background:transparent; }
    #fireside-refined[data-study="shelf"] .fr-spirit-product img { mix-blend-mode:multiply; }
    #fireside-refined[data-study="shelf"] .fr-primary { background:var(--fr-solid);color:var(--fr-solid-text); }
    @media(max-width:720px) {
      #fireside-refined[data-study]:where(:not([data-study="current"])) .fr-spirit { --fr-inset:16px;padding:16px;gap:12px;grid-template-columns:1fr; }
      #fireside-refined[data-study]:where(:not([data-study="current"])) .fr-spirit-product { height:96px; }
      #fireside-refined[data-study="editorial"] .fr-spirit-product:nth-child(2) { margin-top:0; }
      #fireside-refined[data-study="feature"] .fr-spirit { grid-template-columns:80px 1fr;gap:16px; }
      #fireside-refined[data-study="feature"] .fr-spirit-copy { display:block;padding:0; }
      #fireside-refined[data-study="feature"] .fr-spirit h2 { font:var(--fr-type-item); }
      #fireside-refined[data-study="feature"] .fr-spirit-copy p { margin:8px 0 12px; font:var(--fr-type-meta); }
      #fireside-refined[data-study="feature"] .fr-primary { padding-inline:16px; }
      #fireside-refined[data-study="shelf"] .fr-spirit-copy { display:block; }
      #fireside-refined[data-study="shelf"] .fr-primary { margin-top:12px; }
      #fireside-refined[data-study="shelf"] .fr-spirit-products { grid-row:1; }
    }
  `;
  const update=()=>{
    const doc=frame.contentDocument,root=doc?.getElementById('fireside-refined');
    if(!root)return;
    root.dataset.study=look;
    const copy=doc.querySelector('#fr-home .fr-spirit-copy p');
    if(copy)copy.textContent=look==='current' ? copy.dataset.original : 'Falcons apparel for kids and adults.';
    document.getElementById('look-note').textContent=notes[look];
    document.querySelectorAll('[data-look]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.look===look)));
  };
  frame.addEventListener('load',()=>{
    const doc=frame.contentDocument;
    if(!doc?.getElementById('fireside-refined'))return;
    const copy=doc.querySelector('#fr-home .fr-spirit-copy p');
    if(copy)copy.dataset.original=copy.textContent;
    const style=doc.createElement('style');style.textContent=styles;doc.head.append(style);
    update();
    const resize=()=>{frame.style.height=Math.ceil(doc.body.getBoundingClientRect().height)+'px';};
    new ResizeObserver(resize).observe(doc.body);resize();
  });
  document.querySelectorAll('[data-look]').forEach(b=>b.addEventListener('click',()=>{look=b.dataset.look;update();}));
  document.querySelectorAll('[data-size]').forEach(b=>b.addEventListener('click',()=>{
    document.querySelector('.preview').classList.toggle('mobile',b.dataset.size==='mobile');
    document.querySelectorAll('[data-size]').forEach(o=>o.setAttribute('aria-pressed',String(o===b)));
  }));
  frame.src='index.html#home';
})();
