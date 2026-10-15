const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
// Small rendering harness: real data + production routes, fixed Denver calendar day.
function render(hash='', day='2026-12-15', edit=()=>{}) {
  const nodes = new Map();
  const node = id => {
    if (!nodes.has(id)) nodes.set(id,{innerHTML:'',hidden:false,querySelector:()=>null,querySelectorAll:()=>[],setAttribute(){},scrollIntoView(){}});
    return nodes.get(id);
  };
  class FixedDate extends Date {constructor(...args){super(...(args.length ? args : [day+'T19:00:00Z']));}}
  const context = {Date:FixedDate,Intl,document:{getElementById:node,querySelector:node},window:{addEventListener(){},scrollTo(){}},location:{hash},requestAnimationFrame:fn=>fn()};
  vm.createContext(context);
  vm.runInContext(fs.readFileSync('content.js','utf8'),context);
  edit(context.window.FIRESIDE_DATA);
  vm.runInContext(fs.readFileSync('app.js','utf8'),context);
  return nodes;
}
const seasonal = {id:'season-test',date:'2026-12-01',endDate:'2026-12-31',type:'fundraiser',title:'Seasonal collection',summary:['Collection details.'],documents:[],image:{src:'assets/test-flyer.png',alt:'Collection flyer'},source:'https://example.com'};
const addSeason = d => d.events.push(seasonal);
test('date-range event is included through its final day, then archived',()=>{
 for(const day of ['2026-11-30','2026-12-01','2026-12-15','2026-12-31']) {
   assert.match(render('',day,addSeason).get('fr-home').innerHTML,/Seasonal collection/);
 }
 assert.doesNotMatch(render('','2027-01-01',addSeason).get('fr-home').innerHTML,/Seasonal collection/);
 assert.match(render('#past-events','2027-01-01',addSeason).get('fr-events-page').innerHTML,/Seasonal collection/);
});
test('date range and flyer appear on detail page; nonmeeting documents are supported',()=>{
 const nodes=render('#event/season-test','2027-01-01',d=>d.events.push({...seasonal,documents:[{label:'Meeting minutes',url:'https://example.com/minutes'}]}));
 const html=nodes.get('fr-detail').innerHTML;
 assert.equal(nodes.get('fr-detail').hidden,false);
 assert.match(html,/December 1, 2026/);assert.match(html,/December 31, 2026/);
 assert.match(html,/Collection flyer/);assert.match(html,/example.com\/minutes/);assert.match(html,/#past-events/);
});
test('all nine programs route to original descriptions and support photos',()=>{
 const ctx={window:{}};vm.runInNewContext(fs.readFileSync('content.js','utf8'),ctx);
 for(const p of ctx.window.FIRESIDE_DATA.volunteers){
   assert.ok(p.body.length && p.body.join('').length>100);
   const nodes=render('#program/'+p.id);
   assert.equal(nodes.get('fr-program').hidden,false);
   const html=nodes.get('fr-program').innerHTML;
   assert.match(html,/>Contact PTO<\/a>/);
   assert.ok(html.includes('mailto:chairfiresidepto@gmail.com?subject='+encodeURIComponent(p.name)));
   assert.doesNotMatch(html,/View open opportunities/);
 }
 const n=render('#program/ambassador-program','2026-12-15',d=>d.volunteers[0].photos=[{src:'assets/test.jpg',alt:'Garden volunteers'}]);
 assert.match(n.get('fr-program').innerHTML,/Garden volunteers/);
});
test('team has one shared contact, no individual contact addresses',()=>{
 const html=render('#team').get('fr-team').innerHTML;
 assert.equal((html.match(/mailto:/g)||[]).length,1);
 assert.match(html,/mailto:chairfiresidepto@gmail.com/);
 assert.doesNotMatch(html,/fr-email|Contact the PTO for an introduction/);
});
test('fundraising cards open detail pages and keep instructions off the directory',()=>{
 const directory=render('#fundraising').get('fr-fundraising');
 assert.equal(directory.hidden,false);
 assert.match(directory.innerHTML,/firesidemerch.square.site/);
 assert.doesNotMatch(directory.innerHTML,/NE165|Link your account|Contact fundraising/);
 for(const id of ['king-soopers','milk-caps','sponsorship','giving']) {
   assert.ok(directory.innerHTML.includes(`href="#fundraising/${id}"`));
   const nodes=render('#fundraising/'+id);
   assert.equal(nodes.get('fr-fundraising').hidden,true);
   assert.equal(nodes.get('fr-fundraising-detail').hidden,false);
   assert.match(nodes.get('fr-fundraising-detail').innerHTML,/Back to fundraising/);
 }
 const detail=id=>render('#fundraising/'+id).get('fr-fundraising-detail').innerHTML;
 assert.match(detail('king-soopers'),/NE165/);
 assert.match(detail('king-soopers'),/https:\/\/www.kingsoopers.com/);
 assert.match(detail('milk-caps'),/5¢/);
 assert.match(detail('milk-caps'),/school lobby/);
 assert.match(detail('sponsorship'),/mailto:fundraisefiresidepto@gmail.com/);
 assert.match(detail('giving'),/href="#events"/);
 assert.match(detail('giving'),/donorsupport.co/);
 assert.equal(render('#fundraising/unknown').get('fr-home').hidden,false);
});
test('meeting minutes stay attached; placeholders cover upcoming and unposted past records',()=>{
 const meeting={...seasonal,id:'minutes-test',type:'general',date:'2026-12-20',endDate:null,source:'https://example.com/original',documents:[]};
 const page=(day,documents=[])=>render('#event/minutes-test',day,d=>d.meetings.push({...meeting,documents})).get('fr-detail').innerHTML;
 const upcoming=page('2026-12-15');
 assert.match(upcoming,/Meeting minutes will be added after the meeting/);
 assert.match(upcoming,/<dt>When<\/dt>/);assert.match(upcoming,/<dt>Where<\/dt>/);
 assert.doesNotMatch(upcoming,/Original source|example.com\/original/);
 assert.match(page('2026-12-21'),/Meeting minutes will be added when available/);
 const agendaOnly=page('2026-12-15',[{label:'Agenda',url:'https://example.com/agenda'}]);
 assert.match(agendaOnly,/example.com\/agenda/);assert.match(agendaOnly,/added after the meeting/);
 const posted=page('2026-12-21',[{label:'Meeting minutes',url:'https://example.com/minutes'}]);
 assert.match(posted,/example.com\/minutes/);assert.doesNotMatch(posted,/minutes will be added/);
 assert.doesNotMatch(render('#event/season-test','2026-12-15',addSeason).get('fr-detail').innerHTML,/minutes will be added/);
});
