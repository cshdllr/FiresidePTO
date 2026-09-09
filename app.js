(() => {
  'use strict';
  const data = window.FIRESIDE_DATA;
  const root = document.getElementById('fireside-refined');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const external = (label, url) => `<a class="fr-inline" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;
  const parsedDate = date => new Date(`${date}T12:00:00`);
  const fullDate = date => date ? parsedDate(date).toLocaleDateString('en-US', {weekday:'long',year:'numeric',month:'long',day:'numeric'}) : 'Date to confirm';
  const today = new Intl.DateTimeFormat('en-CA', {timeZone:'America/Denver',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const records = [...data.meetings, ...data.events];
  const upcoming = records.filter(x => x.date && x.date >= today && x.type !== 'board').sort((a,b) => a.date.localeCompare(b.date));
  const past = data.meetings.filter(x => x.date < today).sort((a,b) => b.date.localeCompare(a.date));
  const pending = records.filter(x => !x.date);
  const typeLabel = item => ({general:'PTO general meeting',board:'PTO board meeting',community:'Community event',fundraiser:'Fundraiser'}[item.type]);
  const source = url => external('Original source', url);
  const row = item => `<a class="fr-event-row" href="#event/${esc(item.id)}"><span class="fr-calendar"><span>${item.date ? parsedDate(item.date).toLocaleDateString('en-US',{month:'short'}).toUpperCase() : 'DATE'}</span>${item.date ? parsedDate(item.date).getDate() : 'TBC'}</span><span class="fr-row-main"><span class="fr-label">${esc(typeLabel(item))}${item.date && item.date < today ? ' · '+esc(item.schoolYear || '') : ''}</span><strong>${esc(item.title)}</strong><span>${esc(item.date ? fullDate(item.date) : 'Awaiting confirmation')}${item.time ? ' · '+esc(item.time) : ''}</span></span><span class="fr-row-end">${item.date && item.date < today ? (item.documents.length ? 'Meeting records' : 'Meeting details') : 'Details'} →</span></a>`;
  const pageIntro = (label,title,intro) => `<section class="fr-page-intro"><span class="fr-label">${esc(label)}</span><h1>${esc(title)}</h1><p>${esc(intro)}</p></section>`;
  function buildHome() {
    const next = upcoming[0];
    document.getElementById('fr-home').innerHTML = (next ? `<section class="fr-hero"><div class="fr-kicker">UP NEXT AT FIRESIDE <span>${esc(fullDate(next.date))}</span></div><div class="fr-hero-grid"><div><h1>${next.type === 'general' ? 'A chance to connect.' : esc(next.title)}</h1><p>${next.type === 'general' ? 'Join your Fireside community for our next PTO general meeting. Every parent and caregiver is welcome.' : esc(next.summary[0] || 'Gather with the Fireside community.')}</p><a class="fr-primary" href="#event/${esc(next.id)}">View event details →</a></div><aside class="fr-next"><span class="fr-label">${esc(typeLabel(next))}</span><div class="fr-date">${esc(fullDate(next.date))}</div><p>${esc(next.time)}<br>${esc(next.place)}</p>${next.note ? `<div class="fr-note">${esc(next.note)}</div>` : ''}</aside></div></section>` : pageIntro('FIRESIDE PTO','Every family belongs here.','New events will appear here when dates are confirmed.')) + `<section class="fr-events"><div class="fr-section-top"><h2>Around Fireside</h2><a class="fr-inline" href="#events">All events →</a></div>${upcoming.slice(0,3).map(row).join('')}</section><section class="fr-bottom"><div><span class="fr-label">LEND A HAND</span><h2>Find your way to help.</h2><p>Explore nine committees with different time commitments and ways to contribute.</p><a class="fr-inline" href="#volunteer">Explore volunteering →</a></div><div><span class="fr-label">YOUR PTO, IN THE OPEN</span><h2>Stay connected to the decisions.</h2><p>Meeting records stay with each meeting. Find the archive on Events, and budgets and forms in Resources.</p><div class="fr-links"><a class="fr-inline" href="#events">Events & meetings →</a><a class="fr-inline" href="#resources">Budgets & resources →</a></div></div></section>`;
  }
  function buildEvents(showPast) {
    const archives = data.archives.map(year => `<details><summary>${esc(year.year)}${year.links.length ? ' · '+year.links.length+' source '+(year.links.length===1?'link':'links') : ' · no links in source index'}</summary>${year.links.length ? `<ul class="fr-resource-list">${year.links.map(l => `<li>${external(l.label, l.url)} <span class="fr-note">${esc(l.kind)}</span></li>`).join('')}</ul>` : '<p>The archive lists this year without document links.</p>'}</details>`).join('');
    document.getElementById('fr-events-page').innerHTML = pageIntro('THE FIRESIDE CALENDAR','Events & gatherings','See what’s coming up, or catch up on past PTO meetings.')+`<section class="fr-events"><div class="fr-switch" role="group" aria-label="Events view"><a class="fr-inline" href="#events" ${!showPast ? 'aria-current="page"' : ''}>Upcoming events</a><a class="fr-inline" href="#meetings" ${showPast ? 'aria-current="page"' : ''}>Past meetings</a></div>${showPast ? `<h2 class="fr-list-heading">Past PTO meetings</h2><p>General and board meetings are labeled separately. Recaps are summaries of the linked minutes, not official minutes.</p>${past.map(row).join('')}<h2 class="fr-list-heading">Older records by school year</h2><p>Original links are preserved, including years where the source index is incomplete. Some documents may require access from their owner.</p>${archives}<div class="fr-links">${external('Full archive index',data.archiveUrl)}</div>` : `<h2 class="fr-list-heading">Coming up</h2>${upcoming.length ? upcoming.map(row).join('') : '<p>No upcoming dates are currently published.</p>'}<h2 class="fr-list-heading">Dates to confirm</h2>${pending.map(row).join('')}`}</section>`;
  }
  function buildTeam() {
    document.getElementById('fr-team').innerHTML = pageIntro('2026–27 SCHOOL YEAR','Meet your PTO team.','The current role holders listed on the Fireside PTO website. Role contacts are included where they could be verified.')+`<section class="fr-team-grid">${data.team.map(member => `<article><div class="fr-photo" role="img" aria-label="Photo not supplied for ${esc(member.name)}">${esc(member.name.split(' ').map(n=>n[0]).slice(0,2).join(''))}</div><span class="fr-label">${esc(member.role)}</span><h2>${esc(member.name)}</h2>${member.email ? `<a class="fr-inline" href="mailto:${esc(member.email)}">Email ${esc(member.role.split(' · ')[0])} ↗</a>` : '<span class="fr-contact-pending">Contact the PTO for an introduction.</span>'}</article>`).join('')}</section><section class="fr-team-help"><h2>Not sure who to ask?</h2><p>Individual photos were not available in the public roster. Contact the PTO for help reaching a team member.</p><div class="fr-links"><a class="fr-inline" href="mailto:chairfiresidepto@gmail.com">Contact the PTO ↗</a>${source('https://www.firesidepto.org/ptoboard')}</div></section>`;
  }
  function buildResources() {
    document.getElementById('fr-resources').innerHTML = pageIntro('FOR FAMILIES & VOLUNTEERS','Resources','Current budgets, funding and reimbursement forms, and PTO policies—all linked to the original documents.')+['Financial reports','Forms','Policies'].map(group=>`<section class="fr-events"><h2>${group}</h2><ul class="fr-resource-list">${data.resources.filter(r=>r.group===group).map(r=>`<li>${external(r.label,r.url)}</li>`).join('')}</ul></section>`).join('')+`<section class="fr-events"><h2>School & family links</h2><ul class="fr-resource-list">${data.familyLinks.map(l=>`<li>${external(l.label,l.url)}</li>`).join('')}</ul><p>Three older budget labels on the source page point to the same PDF. Those ambiguous entries are omitted until confirmed.</p>${source('https://www.firesidepto.org/policiesforms')}</section>`;
  }
  function buildVolunteer() {
    document.getElementById('fr-volunteer').innerHTML=pageIntro('HELP IN A WAY THAT FITS','Volunteer at Fireside','Choose a committee, help at an event, or contribute from home. Contact the programs team to get connected.')+`<section class="fr-events"><div class="fr-links">${external('Find volunteer opportunities','https://bvsd.helpatschools.com/schools/35/events')}<a class="fr-inline" href="mailto:programsfiresidepto@gmail.com">Email the programs team ↗</a></div></section>`+data.volunteers.map(v=>`<section class="fr-team-help"><span class="fr-label">${esc(v.commitment)}</span><h2>${esc(v.name)}</h2><p>${esc(v.description)}</p></section>`).join('')+`<section class="fr-events">${source('https://www.firesidepto.org/volunteering')}</section>`;
  }
  function showEvent(id) {
    const item=records.find(x=>x.id===id);
    if(!item) return false;
    const isPast=item.date && item.date<today;
    const meeting=['general','board'].includes(item.type);
    const detail=document.getElementById('fr-detail');
    detail.innerHTML=`<a class="fr-back" href="#${isPast ? 'meetings' : 'events'}">← Back to ${isPast ? 'past meetings' : 'events'}</a><div class="fr-detail-head"><span class="fr-label">${esc(typeLabel(item))}</span><h1>${esc(item.title)}</h1><p>${esc(fullDate(item.date))}</p></div><div class="fr-detail-grid"><div>${item.summary.length ? `<section><h2>${isPast ? 'Meeting recap' : 'About this event'}</h2>${item.summary.map(s=>`<p>${esc(s)}</p>`).join('')}${isPast ? '<p class="fr-note">Editorial summary of the source minutes. See the original record below.</p>' : ''}</section>` : ''}${meeting ? `<section><h2>Agenda & meeting records</h2>${item.documents.length ? `<div class="fr-links">${item.documents.map(d=>external(d.label,d.url)).join('')}</div>` : `<p>${isPast ? 'No separate agenda or minutes are linked in the source index for this meeting.' : 'An agenda or minutes document has not yet been linked for this meeting.'}</p>`}</section>` : ''}${item.type==='fundraiser' ? `<div class="fr-links">${external('Donate to Fireside',data.donateUrl)}<a class="fr-inline" href="#volunteer">Volunteer →</a></div>` : ''}${item.note ? `<p class="fr-status">${esc(item.note)}</p>` : ''}${source(item.source)}</div><aside class="fr-info"><dl><dt>WHEN</dt><dd>${esc(fullDate(item.date))}${item.time ? '<br>'+esc(item.time) : '<br>Time not listed in the index'}</dd><dt>WHERE</dt><dd>${esc(item.place || 'Location not listed in the index')}</dd></dl></aside></div>`;
    return true;
  }
  const pageIds=['fr-home','fr-events-page','fr-team','fr-resources','fr-volunteer','fr-detail'];
  function route(focus=false) {
    let route;try {route=decodeURIComponent(location.hash.slice(1)) || 'home';} catch {route='home';}
    pageIds.forEach(id=>document.getElementById(id).hidden=true);
    root.querySelectorAll('nav a').forEach(a=>a.removeAttribute('aria-current'));
    let page='fr-home',nav='home';
    if(route==='events'||route==='meetings'){buildEvents(route==='meetings');page='fr-events-page';nav='events';}
    else if(route==='team'){page='fr-team';nav='team';}
    else if(route==='resources'){page='fr-resources';nav='resources';}
    else if(route==='volunteer'){page='fr-volunteer';nav='volunteer';}
    else if(route.startsWith('event/') && showEvent(route.slice(6))){page='fr-detail';nav='events';}
    const main=document.getElementById(page);main.hidden=false;
    const active=root.querySelector(`nav a[href="#${nav}"]`);if(active)active.setAttribute('aria-current','page');
    const heading=main.querySelector('h1');document.title=(heading?.textContent || 'Home')+' | Fireside PTO';
    if(focus && heading){heading.tabIndex=-1;heading.focus({preventScroll:true});window.scrollTo(0,0);}
  }
  buildHome();buildTeam();buildResources();buildVolunteer();
  document.querySelector('.fr-support').href=data.donateUrl;
  window.addEventListener('hashchange',()=>route(true));
  route();
})();
