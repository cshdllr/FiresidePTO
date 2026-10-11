(() => {
  'use strict';
  const data = window.FIRESIDE_DATA;
  const root = document.getElementById('fireside-refined');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const external = (label, url, arrow=true) => `<a class="fr-inline" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)}${arrow ? ' →' : ''}</a>`;
  const parsedDate = date => new Date(`${date}T12:00:00`);
  const fullDate = date => date ? parsedDate(date).toLocaleDateString('en-US', {weekday:'long',year:'numeric',month:'long',day:'numeric'}) : 'Date to confirm';
  const today = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Denver',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const records = [...data.meetings, ...data.events];
  const endDate = item => item.endDate && item.endDate >= item.date ? item.endDate : item.date;
  const eventDates = item => item.endDate && item.endDate > item.date ? `${fullDate(item.date)} – ${fullDate(item.endDate)}` : fullDate(item.date);
  const upcoming = records.filter(x => x.date && endDate(x) >= today && x.type !== 'board').sort((a,b) => a.date.localeCompare(b.date));
  const pastEvents = records.filter(x => x.date && endDate(x) < today).sort((a,b) => b.date.localeCompare(a.date));
  const pending = records.filter(x => !x.date);
  const typeLabel = item => ({general:'PTO general meeting',board:'PTO board meeting',community:'Community event',fundraiser:'Fundraiser'}[item.type]);
  const source = url => url ? external('Original source', url) : '';
  const row = item => `<a class="fr-event-row" href="#event/${esc(item.id)}"><span class="fr-calendar"><span>${item.date ? parsedDate(item.date).toLocaleDateString('en-US',{month:'short'}).toUpperCase() : 'DATE'}</span>${item.date ? parsedDate(item.date).getDate() : 'TBC'}</span><span class="fr-row-main"><span class="fr-label">${esc(typeLabel(item))}${item.date && endDate(item) < today && item.schoolYear ? ' · '+esc(item.schoolYear) : ''}</span><strong>${esc(item.title)}</strong><span>${esc(item.date ? eventDates(item) : 'Awaiting confirmation')}${item.time ? ' · '+esc(item.time) : ''}</span></span><span class="fr-row-end">${item.date && endDate(item) < today ? (item.documents.length ? 'Records' : 'Details') : 'Details'}</span></a>`;
  const pageIntro = (title, action='') => `<header class="fr-simple-intro fr-title-row"><h1>${esc(title)}</h1>${action}</header>`;
  const eventImage = (item, detail=false) => item.image?.src ? `<a class="fr-flyer-link" href="${detail ? esc(item.image.src) : '#event/'+esc(item.id)}" ${detail ? 'target="_blank" rel="noopener"' : ''}><img class="fr-event-image ${detail ? 'fr-event-image-detail' : ''}" src="${esc(item.image.src)}" alt="${esc(item.image.alt || item.title+' flyer')}" loading="lazy"></a>` : '';
  const spiritWear = () => `<section class="fr-spirit"><img src="${esc(data.fundraising.spiritWear.image.src)}" alt="${esc(data.fundraising.spiritWear.image.alt)}" loading="lazy"><div><h2>Wear your Fireside pride</h2><p>${esc(data.fundraising.spiritWear.description)}</p><a class="fr-primary" href="${esc(data.fundraising.spiritWear.url)}" target="_blank" rel="noopener">Shop spirit wear</a></div></section>`;
  const cardDates = item => {
    if (!item.date) return '';
    const start=parsedDate(item.date), end=parsedDate(endDate(item));
    const isRange=item.endDate && item.endDate>item.date;
    const formatter=new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',...(isRange ? {} : {weekday:'short'})});
    return isRange ? formatter.formatRange(start,end) : formatter.format(start);
  };
  function eventCard(item, index, page) {
    const cover=item.coverImage || item.image;
    const titleId=page+'-card-title-'+item.id, dateId=page+'-card-date-'+item.id;
    const label=item.date && item.date<=today && endDate(item)>=today ? 'Happening now' : (['general','board'].includes(item.type) ? '' : typeLabel(item));
    const date=cardDates(item);
    const metadata=date || item.time ? `<p id="${esc(dateId)}" class="fr-event-meta">${date ? `<span>${esc(date)}</span>` : ''}${item.time ? `<span class="fr-event-time">${date ? '<span aria-hidden="true">·</span> ' : ''}${esc(item.time)}</span>` : ''}</p>` : '';
    return `<article class="fr-event-card"><a class="fr-event-card-link" href="#event/${esc(item.id)}" aria-labelledby="${esc(titleId)}"${metadata ? ` aria-describedby="${esc(dateId)}"` : ''}><div class="fr-card-cover"><div class="fr-cover-fallback" aria-hidden="true"><img src="assets/fireside-logo.png" alt=""></div>${cover?.src ? `<img class="fr-cover-photo${!item.coverImage ? ' fr-cover-flyer' : ''}" src="${esc(cover.src)}" alt="${esc(cover.alt || '')}" loading="${index === 0 ? 'eager' : 'lazy'}" decoding="async" ${index === 0 ? 'fetchpriority="high"' : ''}>` : ''}${label ? `<span class="fr-card-status">${esc(label)}</span>` : ''}</div><div class="fr-event-card-copy"><div class="fr-card-content"><h2 id="${esc(titleId)}">${esc(item.title)}</h2>${metadata || item.place ? `<div class="fr-card-info">${metadata}${item.place ? `<p class="fr-event-place">${esc(item.place)}</p>` : ''}</div>` : ''}</div></div></a></article>`;
  }
  function bindCoverFallback(container) {
    // Keep the branded fallback visible if an uploaded cover cannot load.
    container.querySelectorAll('.fr-cover-photo').forEach(img=>{
      img.addEventListener('error',()=>{img.hidden=true;});
      if(img.complete && !img.naturalWidth) img.hidden=true;
    });
  }
  function buildHome() {
    const home=document.getElementById('fr-home');
    home.innerHTML = `${pageIntro('Upcoming events', '<a class="fr-secondary fr-desktop-section-action" href="#events">All events</a>')}<section class="fr-event-grid" aria-label="Upcoming and ongoing events">${upcoming.slice(0,3).map((item,index)=>eventCard(item,index,'home')).join('') || '<p>New events will appear here when dates are confirmed.</p>'}</section><div class="fr-mobile-section-action"><a class="fr-secondary" href="#events">All events</a></div>${spiritWear()}`;
    bindCoverFallback(home);
  }
  function buildEvents(view='upcoming') {
    const showPast = view==='past-events';
    const archives = data.archives.map(year => `<details><summary>${esc(year.year)}${year.links.length ? ' · '+year.links.length+' source '+(year.links.length===1?'link':'links') : ' · no links in source index'}</summary>${year.links.length ? `<ul class="fr-resource-list">${year.links.map(l => `<li>${external(l.label, l.url)} <span class="fr-note">${esc(l.kind)}</span></li>`).join('')}</ul>` : '<p>The archive lists this year without document links.</p>'}</details>`).join('');
    const eventsPage=document.getElementById('fr-events-page');
    const content=showPast
      ? `<section class="fr-event-grid fr-event-list" aria-label="Past events">${pastEvents.map((item,index)=>eventCard(item,index,'past')).join('') || '<p>No past events are listed yet.</p>'}</section><section class="fr-events" aria-labelledby="archive-title"><h2 id="archive-title" class="fr-list-heading">Older records by school year</h2><p>Original links are preserved, including years where the source index is incomplete. Some documents may require access from their owner.</p>${archives}<div class="fr-links">${external('Full archive index',data.archiveUrl)}</div></section>`
      : `<section class="fr-event-grid fr-event-list" aria-label="Upcoming events">${upcoming.map((item,index)=>eventCard(item,index,'events')).join('') || '<p>No upcoming dates are currently published.</p>'}</section>${pending.length ? '<section class="fr-events" aria-labelledby="pending-events-title"><h2 class="fr-list-heading" id="pending-events-title">Dates to confirm</h2>'+pending.map(row).join('')+'</section>' : ''}`;
    eventsPage.innerHTML=pageIntro('Events', `<div class="fr-switch" role="group" aria-label="Events view"><a class="fr-inline" href="#events" ${!showPast ? 'aria-current="page"' : ''}>Upcoming events</a><a class="fr-inline" href="#past-events" ${showPast ? 'aria-current="page"' : ''}>Past events</a></div>`)+content;
    bindCoverFallback(eventsPage);
  }
  function buildTeam() {
    const team = document.getElementById('fr-team');
    team.innerHTML = `${pageIntro('PTO team', '<a class="fr-secondary" href="mailto:chairfiresidepto@gmail.com">Contact PTO</a>')}<section class="fr-team-grid">${data.team.map(member => `<article><div class="fr-photo" aria-hidden="true">${esc(member.name.split(' ').map(n=>n[0]).slice(0,2).join(''))}${member.photo?.src ? `<img src="${esc(member.photo.src)}" alt="" loading="lazy" decoding="async" style="object-position:${esc(member.photo.position || '50% 50%')}">` : ''}</div><h2>${esc(member.name)}</h2><span class="fr-commitment">${esc(member.role)}</span></article>`).join('')}</section>`;
    team.querySelectorAll('.fr-photo img').forEach(img => {
      img.addEventListener('error', () => { img.hidden = true; });
      if (img.complete && !img.naturalWidth) img.hidden = true;
    });
  }
  const resourceList = items => `<ul class="fr-resource-list">${items.map(r=>`<li>${external(r.label,r.url,false)}</li>`).join('')}</ul>`;
  function buildResources() {
    const financials = data.resources.filter(r=>r.group==='Financial reports');
    const current = financials.filter(r=>r.label.startsWith('2026-2027'));
    const archived = financials.filter(r=>!current.includes(r));
    document.getElementById('fr-resources').innerHTML = `${pageIntro('Resources')}<div class="fr-resource-grid"><section><h2>Forms</h2>${resourceList(data.resources.filter(r=>r.group==='Forms'))}</section><section><h2>Budgets & reports</h2>${resourceList(current)}<details><summary>Previous years</summary>${resourceList(archived)}</details></section><section><h2>Policies</h2>${resourceList(data.resources.filter(r=>r.group==='Policies'))}</section><section><h2>School & family links</h2>${resourceList(data.familyLinks)}</section></div>`;
  }
  function buildVolunteer() {
    document.getElementById('fr-volunteer').innerHTML=`${pageIntro('Volunteer', '<a class="fr-secondary" href="https://bvsd.helpatschools.com/schools/35/events" target="_blank" rel="noopener">View open opportunities</a>')}<section class="fr-committee-section" aria-label="Volunteer committees"><div class="fr-committee-grid">${data.volunteers.map(v=>`<article><a class="fr-program-link" href="#program/${esc(v.id)}" aria-labelledby="program-title-${esc(v.id)}"><div><h2 id="program-title-${esc(v.id)}">${esc(v.name)}</h2><p>${esc(v.description)}</p></div><div class="fr-program-card-footer"><span class="fr-commitment">${esc(v.commitment)}</span><span class="fr-secondary" aria-hidden="true">Learn more</span></div></a></article>`).join('')}</div></section>`;
  }
  function showProgram(id) {
    const program = data.volunteers.find(p=>p.id===id);
    if (!program) return false;
    document.getElementById('fr-program').innerHTML=`<a class="fr-back" href="#volunteer">← Back to volunteering</a>${pageIntro(program.name)}<div class="fr-program-body"><p class="fr-commitment">${esc(program.commitment)}${program.season ? ' · '+esc(program.season) : ''}</p>${(program.photos || []).map(photo=>`<img class="fr-program-photo" src="${esc(photo.src)}" alt="${esc(photo.alt)}" loading="lazy">`).join('')}${program.body.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="fr-links"><a class="fr-secondary" href="https://bvsd.helpatschools.com/schools/35/events" target="_blank" rel="noopener">View open opportunities</a></div></div>`;
    return true;
  }
  function buildFundraising() {
    const f=data.fundraising;
    document.getElementById('fr-fundraising').innerHTML=`${pageIntro('Fundraising')}${spiritWear()}
      <div class="fr-fundraising-grid">
        <section><div><h2>King Soopers rewards</h2><p>Support Fireside when you shop, at no extra cost to you.</p><ol><li>Sign in to your King Soopers account.</li><li>Go to My Account → Community Rewards.</li><li>Search for Fireside PTO or use code <strong>${esc(f.kingSoopers.code)}</strong>.</li><li>Use your linked phone number when you shop.</li></ol></div><div class="fr-card-actions"><a class="fr-secondary" href="${esc(f.kingSoopers.url)}" target="_blank" rel="noopener">Link your account</a></div></section>
        <section><div><h2>Milk Caps for Moola</h2><p>Save and rinse your Longmont Dairy milk caps, then drop them in the collection box in the school lobby. Fireside receives 5¢ for each cap redeemed.</p></div><div class="fr-card-actions"><a class="fr-secondary" href="${esc(f.milkCapsSource)}" target="_blank" rel="noopener">Program details</a></div></section>
        <section id="fr-sponsorship"><div><h2>Become a sponsor</h2><p>Local businesses can support Fireside through PTO sponsorships. Contact our fundraising team to learn about the available levels and opportunities.</p></div><div class="fr-card-actions"><a class="fr-secondary" href="mailto:${esc(f.sponsorshipEmail)}?subject=Interested%20in%20sponsorship">Contact fundraising</a></div></section>
        <section><div><h2>Give to Fireside</h2><p>The annual Fun Run and family donations help fund classroom allocations, para-educator support, and student events.</p></div><div class="fr-card-actions"><a class="fr-secondary" href="${esc(data.donateUrl)}" target="_blank" rel="noopener">Donate</a><a class="fr-secondary" href="#events">Fundraising events</a></div></section>
      </div>`;
  }
  function showEvent(id) {
    const item=records.find(x=>x.id===id);
    if(!item) return false;
    const isPast=item.date && endDate(item)<today;
    const meeting=['general','board'].includes(item.type);
    const detail=document.getElementById('fr-detail');
    detail.innerHTML=`<a class="fr-back" href="#${isPast ? 'past-events' : 'events'}">← Back to ${isPast ? 'past events' : 'events'}</a>${pageIntro(item.title)}<div class="fr-detail-grid"><div>${item.coverImage?.src ? `<figure class="fr-detail-cover"><img src="${esc(item.coverImage.src)}" alt="${esc(item.coverImage.alt || item.title)}">${item.coverImage.caption ? `<figcaption>${esc(item.coverImage.caption)}</figcaption>` : ''}</figure>` : ''}${eventImage(item,true)}${item.summary.length ? `<section><h2>${isPast ? (meeting ? 'Meeting recap' : 'Event recap') : 'About this event'}</h2>${item.summary.map(s=>`<p>${esc(s)}</p>`).join('')}${isPast && meeting ? '<p class="fr-note">Editorial summary of the source minutes. See the original record below.</p>' : ''}</section>` : ''}${meeting || isPast || item.documents.length ? `<section><h2>${meeting ? 'Agenda & meeting records' : 'Event documents & minutes'}</h2>${item.documents.length ? `<div class="fr-links">${item.documents.map(d=>external(d.label,d.url)).join('')}</div>` : `<p>${isPast ? (meeting ? 'Minutes have not been linked for this meeting yet.' : 'No documents or minutes have been attached to this event yet.') : 'An agenda or minutes document has not yet been linked for this meeting.'}</p>`}</section>` : ''}${item.type==='fundraiser' ? `<div class="fr-links">${external('Donate to Fireside',data.donateUrl)}<a class="fr-inline" href="#volunteer">Volunteer →</a></div>` : ''}${item.note ? `<p class="fr-status">${esc(item.note)}</p>` : ''}${source(item.source)}</div><aside class="fr-info"><dl><dt>WHEN</dt><dd>${esc(eventDates(item))}${item.time ? '<br>'+esc(item.time) : '<br>Time to be confirmed'}</dd><dt>WHERE</dt><dd>${esc(item.place || 'Location to be confirmed')}</dd></dl></aside></div>`;
    return true;
  }
  const pageIds=['fr-home','fr-events-page','fr-team','fr-resources','fr-volunteer','fr-detail','fr-program','fr-fundraising'];
  let previousPage;
  function route(focus=false) {
    let route;try {route=decodeURIComponent(location.hash.slice(1)) || 'home';} catch {route='home';}
    pageIds.forEach(id=>document.getElementById(id).hidden=true);
    root.querySelectorAll('nav a').forEach(a=>a.removeAttribute('aria-current'));
    let page='fr-home',nav='home';
    if(['events','meetings','past-events'].includes(route)){buildEvents(route==='events' ? 'upcoming' : 'past-events');page='fr-events-page';nav='events';}
    else if(route==='team'){page='fr-team';nav='team';}
    else if(route==='resources'){page='fr-resources';nav='resources';}
    else if(route==='volunteer'){page='fr-volunteer';nav='volunteer';}
    else if(route==='fundraising'||route==='fundraising/sponsorship'){page='fr-fundraising';nav='fundraising';}
    else if(route.startsWith('program/') && showProgram(route.slice(8))){page='fr-program';nav='volunteer';}
    else if(route.startsWith('event/') && showEvent(route.slice(6))){page='fr-detail';nav='events';}
    const main=document.getElementById(page);main.hidden=false;
    const active=root.querySelector(`nav a[href="#${nav}"]`);if(active)active.setAttribute('aria-current','page');
    if(route==='fundraising/sponsorship') requestAnimationFrame(()=>document.getElementById('fr-sponsorship').scrollIntoView({block:'start'}));
    const heading=main.querySelector('h1');document.title=(heading?.textContent || 'Home')+' | Fireside PTO';
    if(focus && heading){heading.tabIndex=-1;heading.focus({preventScroll:true});window.scrollTo(0,0);}
    if (previousPage !== page || ['fr-detail','fr-program','fr-events-page'].includes(page)) {
      window.FiresideMotion?.enter(main, { contentOnly: previousPage === page && page === 'fr-events-page' });
    } else {
      window.FiresideMotion?.cancel();
    }
    previousPage = page;
  }
  buildHome();buildTeam();buildResources();buildVolunteer();buildFundraising();
  document.querySelector('.fr-support').href=data.donateUrl;
  window.addEventListener('hashchange',()=>route(true));
  route();
})();
