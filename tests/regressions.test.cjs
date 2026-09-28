const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

function load(relative, globals = {}) {
  const filename = path.resolve(relative);
  const source = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports, ...globals,
    require: (name) => load(path.resolve(path.dirname(filename), `${name}.ts`), globals),
  }, { filename });
  return exports;
}

const booking = load('src/services/bookingValidation.ts');
const contact = { name: 'عميل', phone: '0501234567', email: '', people: '' };

test('booking accepts optional fields and spaced phone numbers', () => {
  assert.equal(booking.validateBookingContact({ ...contact, phone: '050 123 4567' }), '');
});
test('booking rejects blank names, invalid phones and emails', () => {
  for (const change of [{ name: ' ' }, { phone: '123' }, { email: 'invalid@' }]) {
    assert.notEqual(booking.validateBookingContact({ ...contact, ...change }), '');
  }
});
test('people must be a positive safe integer', () => {
  for (const people of ['0', '-1', '1.5', 'Infinity', 'abc', '9007199254740992']) {
    assert.notEqual(booking.validateBookingContact({ ...contact, people }), '');
  }
  assert.equal(booking.validateBookingContact({ ...contact, people: '4' }), '');
});
test('booking rejects missing, malformed, impossible and past dates', () => {
  const now = new Date('2026-09-27T12:00:00');
  for (const [date, time] of [['', ''], ['2026-09-27', '11:59'], ['2026-09-28', '25:00'], ['2026-02-30', '14:00'], ['2026-09-27', '12:00']]) {
    assert.notEqual(booking.validateBookingDate(date, time, now), '');
  }
  assert.equal(booking.validateBookingDate('2026-09-27', '12:01', now), '');
});
test('local day is formatted without converting to UTC', () => {
  assert.equal(booking.localDate(new Date(2026, 8, 27, 0, 5)), '2026-09-27');
});

function contentStore(initial, blocked = false) {
  let stored = initial;
  let events = 0;
  return {
    service: load('src/services/contentService.ts', {
      localStorage: {
        getItem() { if (blocked) throw new Error('blocked'); return stored; },
        setItem(key, value) { if (blocked) throw new Error('blocked'); stored = value; },
        removeItem() { if (blocked) throw new Error('blocked'); stored = null; },
      },
      window: { dispatchEvent() { events++; } }, Event: class {},
    }),
    events: () => events,
  };
}
test('missing, invalid, null and blocked storage fall back to defaults', () => {
  for (const value of [null, '{broken', 'null', '[]']) {
    assert.equal(typeof contentStore(value).service.getSiteContent().hero.title, 'string');
  }
  assert.equal(typeof contentStore(null, true).service.getSiteContent().hero.title, 'string');
});
test('partial saved content retains defaults and rejects malformed fields', () => {
  const { service } = contentStore(JSON.stringify({ hero: { title: 'عنوان جديد', features: [null] }, about: null, values: { items: [null] } }));
  const content = service.getSiteContent();
  assert.equal(content.hero.title, 'عنوان جديد');
  assert.equal(typeof content.hero.features[0], 'string');
  assert.equal(typeof content.about.title, 'string');
  assert.equal(typeof content.values.items[0].title, 'string');
});
test('saving and resetting content notifies subscribers', () => {
  const store = contentStore(null);
  const content = store.service.getSiteContent();
  store.service.saveSiteContent({ ...content, hero: { ...content.hero, title: 'تجربة' } });
  assert.equal(store.service.getSiteContent().hero.title, 'تجربة');
  store.service.resetSiteContent();
  assert.equal(store.service.getSiteContent().hero.title, content.hero.title);
  assert.equal(store.events(), 2);
});
test('write failures propagate so the editor cannot report false success', () => {
  const { service } = contentStore(null, true);
  assert.throws(() => service.saveSiteContent(service.getSiteContent()));
  assert.throws(() => service.resetSiteContent());
});
