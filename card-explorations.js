(() => {
  'use strict';
  const directions = [
    {name:'Quiet editorial', note:'A compact cover, a clear title, and one connected schedule. The most natural evolution of the current site.', recommended:true},
    {name:'Calendar first', note:'A distinct date column gives the schedule priority. The month-long sale and single-day meetings use the same rhythm.'},
    {name:'Title first', note:'Lead with the event name and schedule, then let the image add character. A quieter, more editorial direction.', recommended:true},
    {name:'Inset photograph', note:'A little breathing room around the image softens the card. The text remains tight and the whole surface is clickable.'},
    {name:'Compact companion', note:'Small thumbnails and closely grouped details make this the quickest to scan. The lightest option for a busy calendar.', recommended:true},
    {name:'Photographic cover', note:'The title sits over the image, with a separate, readable schedule below. More visual impact, with a dark branded fallback.'},
    {name:'Side by side', note:'A narrow image column keeps photos and text together, even on the homepage. The Events version uses the same simple rhythm.'},
    {name:'Framed agenda', note:'Typography and a shared date column do most of the work. Small images are secondary, so events without artwork feel equally complete.'},
    {name:'Connected collection', note:'One shared surface holds three distinct clickable events. A restrained option with fewer individual boxes.'},
    {name:'Image ribbon', note:'A short strip of imagery sits between the title and schedule. It keeps some visual warmth while reducing image height.'}
  ];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const records = [...window.FIRESIDE_DATA.events, ...window.FIRESIDE_DATA.meetings];
  // Fixed real examples make the comparisons consistent, including a range and missing covers.
  const samples = ['2026-halloween-costume-sale','2026-11-20-general','2027-01-29-general'].map(id => records.find(event => event.id === id)).filter(Boolean);
  const day = value => new Date(`${value}T12:00:00`);
  const today = new Intl.DateTimeFormat('en-CA',{timeZone:'America/Denver',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const dates = event => {
    const range = event.endDate && event.endDate > event.date;
    const format = new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',...(range ? {} : {weekday:'short'})});
    return range ? format.formatRange(day(event.date),day(event.endDate)) : format.format(day(event.date));
  };
  const options = document.getElementById('study-options');
  const canvas = document.getElementById('study-canvas');
  const selectedLook = () => Math.max(1,Math.min(10,parseInt(location.hash.slice(1),10) || 1));
  let current = selectedLook();
  let view = 'both';
  options.innerHTML = directions.map((direction,index) => `<button type="button" data-look="${index+1}" aria-pressed="false"><span class="study-option-number">${String(index+1).padStart(2,'0')}</span><span>${esc(direction.name)}</span>${direction.recommended ? '<span class="study-recommended" aria-label="Recommended">●</span>' : ''}</button>`).join('');

  function card(event,index,layout) {
    const prefix = `study-${current}-${layout}-${index}`;
    const cover = event.coverImage || event.image;
    const range = event.endDate && event.endDate > event.date;
    const date = day(event.date);
    const month = date.toLocaleDateString('en-US',{month:'short'});
    const dayNumber = range && event.date.slice(0,7) === event.endDate.slice(0,7) ? `${date.getDate()}–${day(event.endDate).getDate()}` : date.getDate();
    const weekday = range ? (event.date.slice(0,7) === event.endDate.slice(0,7) ? '' : dates(event)) : date.toLocaleDateString('en-US',{weekday:'short'});
    const ongoing = event.date <= today && (event.endDate || event.date) >= today;
    const schedule = `<div class="study-schedule" id="${prefix}-date"><time datetime="${esc(event.date)}">${esc(dates(event))}</time>${event.time ? `<span class="study-time"><span aria-hidden="true">·</span> ${esc(event.time)}</span>` : ''}</div>`;
    const status = ongoing ? '<span class="study-status">Happening now</span>' : '';
    return `<article class="study-card"><a href="index.html#event/${esc(event.id)}" target="_blank" rel="noopener" aria-labelledby="${prefix}-title" aria-describedby="${prefix}-date"><div class="study-media${cover ? '' : ' study-media-fallback'}"><div class="study-fallback" aria-hidden="true"><img src="assets/fireside-logo.png" alt=""></div>${cover ? `<img class="study-cover${!event.coverImage ? ' study-flyer' : ''}" src="${esc(cover.src)}" alt="${esc(cover.alt || '')}" decoding="async">` : ''}</div><div class="study-date-mark" aria-hidden="true"><span>${esc(month)}</span><strong>${esc(dayNumber)}</strong>${weekday ? `<span>${esc(weekday)}</span>` : ''}${event.time ? `<small>${esc(event.time)}</small>` : ''}</div><div class="study-card-copy">${status}<h3 id="${prefix}-title">${esc(event.title)}</h3>${schedule}${event.place ? `<p class="study-location">${esc(event.place)}</p>` : ''}</div><span class="study-card-arrow" aria-hidden="true">→</span></a></article>`;
  }

  function render(announce = false) {
    const direction = directions[current-1];
    document.getElementById('study-count').textContent = `${String(current).padStart(2,'0')} / 10${direction.recommended ? ' · Shortlist' : ''}`;
    document.getElementById('study-title').textContent = direction.name;
    document.getElementById('study-description').textContent = direction.note;
    document.title = `${String(current).padStart(2,'0')} ${direction.name} | Fireside card directions`;
    options.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.look) === current)));
    canvas.className = `study-look-${current}`;
    canvas.innerHTML = ['home','events'].map(layout => `<section class="study-layout study-layout-${layout}" ${view !== 'both' && view !== layout ? 'hidden' : ''} aria-labelledby="study-${layout}-heading"><div class="study-layout-heading"><h3 id="study-${layout}-heading">${layout === 'home' ? 'Homepage' : 'Events page'}</h3><span>${layout === 'home' ? 'A preview of the next three events' : 'A vertical schedule'}</span></div><div class="study-cards study-${layout}">${samples.map((event,index) => card(event,index,layout)).join('')}</div></section>`).join('');
    canvas.querySelectorAll('.study-cover').forEach(image => {
      const fallback = () => { image.hidden = true; image.parentElement.classList.add('study-media-fallback'); };
      image.addEventListener('error',fallback,{once:true});
      if (image.complete && !image.naturalWidth) fallback();
    });
    if (announce) document.getElementById('study-announcement').textContent = `Design ${current} of 10: ${direction.name}.`;
  }
  function choose(number) {
    current = (number+9)%10+1;
    history.replaceState(null,'',`#${String(current).padStart(2,'0')}`);
    render(true);
  }
  document.querySelectorAll('[data-look]').forEach(button => button.addEventListener('click',()=>choose(Number(button.dataset.look))));
  document.getElementById('study-previous').addEventListener('click',()=>choose(current-1));
  document.getElementById('study-next').addEventListener('click',()=>choose(current+1));
  document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click',()=>{
    view = button.dataset.view;
    document.querySelectorAll('[data-view]').forEach(option=>option.setAttribute('aria-pressed',String(option===button)));
    canvas.querySelectorAll('.study-layout').forEach(section=>{section.hidden=view!=='both'&&!section.classList.contains(`study-layout-${view}`);});
  }));
  window.addEventListener('hashchange',()=>{current=selectedLook();render();});
  render();
})();
