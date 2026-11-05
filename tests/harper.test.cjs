const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class Element {
  constructor(text = '') { this.text = text; this.children = []; }
  createEl(tag, options = {}) { const el = new Element(options.text); el.tag = tag; this.children.push(el); return el; }
  createDiv(options) { return this.createEl('div', options); }
  empty() { this.children = []; }
  addEventListener(event, cb) { this[event] = cb; }
}
let modal;
class Modal {
  constructor(app) { this.app = app; this.contentEl = new Element(); modal = this; }
  open() { this.pending = this.onOpen(); }
  close() { this.onClose(); }
}
class MarkdownView { constructor() { this.file = {}; } }
const notices = [];
class Notice { constructor(text) { notices.push(text); } }
class Base { constructor() { this.manifest = { id: 'make-md', dir: '.obsidian/plugins/make-md' }; this.app = { vault: { adapter: { readBinary: async () => { throw new Error('unexpected external file access'); } } } }; } async onload() {} addCommand(c) { this.command = c; } }
function load() {
  const marker = '/* PAGEMELD HARPER INTEGRATION START */';
  const code = fs.readFileSync('main.js', 'utf8').split(marker)[1];
  const module = { exports: { default: Base } };
  vm.runInNewContext(code, { module, require: name => { if (name === 'obsidian') return { Modal, MarkdownView, Notice }; return require(name); }, console, crypto: require("node:crypto").webcrypto, URL, Blob, fetch, WebAssembly, TextDecoder, TextEncoder, Response, setTimeout, clearTimeout, performance, Symbol });
  return module.exports.default;
}
function editor(text) { return { value: text, getValue() { return this.value; }, offsetToPos(n) { return n; }, replaceRange(text, a, b) { this.value = this.value.slice(0, a) + text + this.value.slice(b); } }; }
function buttons(el) { return [ ...(el.tag === 'button' ? [el] : []), ...el.children.flatMap(buttons) ]; }

test('checks a Markdown note locally and applies a suggestion', async () => {
  const Plugin = load(); const plugin = new Plugin(); await plugin.onload();
  const ed = editor('This is a problm.'); plugin.command.editorCallback(ed, new MarkdownView());
  await modal.pending;
  const choices = buttons(modal.contentEl);
  assert.ok(choices.length, 'expected Harper to suggest a correction');
  choices[0].click();
  assert.notEqual(ed.value, 'This is a problm.');
});

test('rejects stale results rather than overwriting edits', async () => {
  const Plugin = load(); const plugin = new Plugin(); await plugin.onload();
  const ed = editor('This is a problm.'); plugin.command.editorCallback(ed, new MarkdownView());
  await modal.pending;
  const choices = buttons(modal.contentEl); assert.ok(choices.length);
  ed.value += ' Added.'; choices[0].click();
  assert.equal(ed.value, 'This is a problm. Added.');
  assert.match(notices.at(-1), /changed/);
});
