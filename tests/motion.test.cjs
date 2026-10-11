const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Exercise the production controller without timing-sensitive browser animations.
class Events {
  constructor() { this.listeners = new Map(); }
  addEventListener(type, callback, options = {}) {
    const listeners = this.listeners.get(type) || [];
    listeners.push({callback, once: options.once});
    this.listeners.set(type, listeners);
  }
  dispatch(type) {
    for (const listener of [...(this.listeners.get(type) || [])]) {
      if (listener.once) this.listeners.set(type, this.listeners.get(type).filter(item => item !== listener));
      listener.callback({type});
    }
  }
}

class Element extends Events {
  constructor({tag = 'div', classes = [], children = [], rect, complete = false} = {}) {
    super();
    Object.assign(this, {tag, classes, children, complete, hidden: false, naturalWidth: 800});
    this.rect = rect || {top: 100, bottom: 200, height: 100};
    this.animations = [];
  }
  matches(selector) {
    return selector.split(',').some(part => {
      const value = part.trim();
      return value.startsWith('.') ? this.classes.includes(value.slice(1)) : value === this.tag;
    });
  }
  contains(element) { return this === element || this.children.some(child => child.contains(element)); }
  querySelectorAll(selector) {
    return this.children.flatMap(child => [...(child.matches(selector) ? [child] : []), ...child.querySelectorAll(selector)]);
  }
  querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
  getBoundingClientRect() { return this.rect; }
  animate(frames, options) {
    const animation = {
      frames, options, cancelled: false,
      cancel() { this.cancelled = true; this.oncancel?.(); }
    };
    this.animations.push(animation);
    return animation;
  }
}

function setup({reducedMotion = false} = {}) {
  const root = new Element();
  const reduced = new Events();
  reduced.matches = reducedMotion;
  const document = {getElementById: () => root, activeElement: null};
  const window = {matchMedia: () => reduced, innerHeight: 800};
  const tokens = {'--fr-motion-enter': '360ms', '--fr-motion-fast': '180ms', '--fr-motion-stagger': '40ms', '--fr-motion-ease': 'ease-out'};
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../motion.js'), 'utf8'), {
    document, window, getComputedStyle: () => ({getPropertyValue: name => tokens[name] || ''})
  });
  return {root, reduced, document, motion: window.FiresideMotion};
}

test('reduced motion reveals pages and loaded images without starting animations', () => {
  const {motion} = setup({reducedMotion: true});
  const image = new Element({tag: 'img'});
  const content = new Element({children: [image]});
  motion.enter(new Element({children: [content]}));
  image.dispatch('load');
  assert.equal(content.animations.length, 0);
  assert.equal(image.animations.length, 0);
});

test('turning on reduced motion cancels an in-progress entrance and bypasses future ones', () => {
  const {motion, reduced} = setup();
  const content = new Element();
  const page = new Element({children: [content]});
  motion.enter(page);
  assert.equal(content.animations.length, 1);
  reduced.matches = true;
  reduced.dispatch('change');
  assert.equal(content.animations[0].cancelled, true);
  motion.enter(page);
  assert.equal(content.animations.length, 1);
});

test('rapid navigation cancels previous-page animations before starting the new page', () => {
  const {motion} = setup();
  const firstContent = new Element();
  const secondContent = new Element();
  motion.enter(new Element({children: [firstContent]}));
  const firstAnimation = firstContent.animations[0];
  assert.equal(firstAnimation.cancelled, false);
  motion.enter(new Element({children: [secondContent]}));
  assert.equal(firstAnimation.cancelled, true);
  assert.equal(secondContent.animations.length, 1);
  assert.equal(secondContent.animations[0].cancelled, false);
});

test('focused headings stay stationary and focusing content cancels decorative motion', () => {
  const {motion, document, root} = setup();
  const heading = new Element({tag: 'h1'});
  const header = new Element({classes: ['fr-simple-intro'], children: [heading]});
  const content = new Element();
  document.activeElement = heading;
  motion.enter(new Element({children: [header, content]}));
  assert.equal(header.animations.length, 0);
  assert.equal(heading.animations.length, 0);
  assert.equal(content.animations.length, 1);
  document.activeElement = content;
  root.dispatch('focusin');
  assert.equal(content.animations[0].cancelled, true);
});

test('Events filtering skips the header and uses only immediate, stationary fades', () => {
  const {motion} = setup();
  const header = new Element({classes: ['fr-simple-intro']});
  const back = new Element({classes: ['fr-back']});
  const rows = [new Element(), new Element(), new Element()];
  const section = new Element({classes: ['fr-events'], children: rows});
  motion.enter(new Element({children: [back, header, section]}), {contentOnly: true});
  assert.equal(header.animations.length, 0);
  assert.equal(back.animations.length, 0);
  assert.equal(section.animations.length, 0);
  for (const row of rows) {
    assert.equal(row.animations.length, 1);
    const {frames, options} = row.animations[0];
    assert.equal(options.delay, 0);
    assert.equal(options.duration, 180);
    assert.ok(frames.every(frame => frame.transform === 'none'));
    assert.equal(frames[0].opacity, 0);
    assert.equal(frames.at(-1).opacity, 1);
  }
});

test('late-loading images animate only while their page is current and visible', () => {
  for (const state of ['current', 'hidden', 'previous']) {
    const {motion} = setup();
    const image = new Element({tag: 'img'});
    const page = new Element({children: [new Element({children: [image]})]});
    motion.enter(page);
    if (state === 'hidden') page.hidden = true;
    if (state === 'previous') motion.enter(new Element({children: [new Element()]}));
    image.dispatch('load');
    assert.equal(image.animations.length, state === 'current' ? 1 : 0, state);
  }
});

test('offscreen and zero-height content do not consume entrance animations', () => {
  const {motion} = setup();
  const visible = new Element();
  const below = new Element({rect: {top: 850, bottom: 950, height: 100}});
  const above = new Element({rect: {top: -100, bottom: 0, height: 100}});
  const empty = new Element({rect: {top: 100, bottom: 100, height: 0}});
  motion.enter(new Element({children: [below, above, empty, visible]}));
  for (const item of [below, above, empty]) assert.equal(item.animations.length, 0);
  assert.equal(visible.animations.length, 1);
  assert.equal(visible.animations[0].options.delay, 0);
});
