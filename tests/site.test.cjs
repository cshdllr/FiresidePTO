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
   assert.match(nodes.get('fr-program').innerHTML,/View open opportunities/);
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
test('fundraising and sponsorship route and retain verified program details',()=>{
 const n=render('#fundraising/sponsorship');assert.equal(n.get('fr-fundraising').hidden,false);
 assert.match(n.get('fr-fundraising').innerHTML,/NE165/);
 assert.match(n.get('fr-fundraising').innerHTML,/firesidemerch.square.site/);
});
