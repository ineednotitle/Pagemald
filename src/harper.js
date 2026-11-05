// Harper integration for the distributed PageMeld bundle.
import { Modal, Notice, MarkdownView } from 'obsidian';
import { LocalLinter } from 'harper.js';
import { binaryInlined } from 'harper.js/binaryInlined';

class HarperModal extends Modal {
  constructor(plugin, editor, view) {
    super(plugin.app);
    this.plugin = plugin;
    this.editor = editor;
    this.view = view;
    this.snapshot = editor.getValue();
    this.closed = false;
  }

  async onOpen() {
    this.contentEl.createEl('h2', { text: 'Harper grammar check' });
    const results = this.contentEl.createDiv({ cls: 'pagemeld-harper-results' });
    results.createEl('p', { text: 'Checking note…' });
    let linter;
    try {
      linter = new LocalLinter({ binary: binaryInlined });
      const lints = await linter.lint(this.snapshot, { language: 'markdown' });
      const issues = [];
      try {
        for (const lint of lints) {
          const suggestions = lint.suggestions();
          try {
            const fixes = [];
            for (const suggestion of suggestions) {
              fixes.push({ label: suggestion.get_replacement_text() || '(remove)', text: await linter.applySuggestion(this.snapshot, lint, suggestion) });
            }
            issues.push({ message: lint.message(), problem: lint.get_problem_text(), fixes });
          } finally { suggestions.forEach(s => s.free()); }
        }
      } finally { lints.forEach(l => l.free()); }
      if (this.closed) return;
      results.empty();
      if (!issues.length) results.createEl('p', { text: 'No issues found.' });
      for (const issue of issues) {
        const row = results.createDiv({ cls: 'pagemeld-harper-issue' });
        row.createEl('strong', { text: issue.problem });
        row.createEl('p', { text: issue.message });
        for (const fix of issue.fixes) {
          const button = row.createEl('button', { text: fix.label });
          button.addEventListener('click', () => this.apply(fix.text));
        }
      }
    } catch (error) {
      console.error('Harper grammar check failed', error);
      if (!this.closed) { results.empty(); results.createEl('p', { text: 'Could not run Harper. Please try again and check the developer console for details.' }); }
    } finally {
      if (linter) await linter.dispose().catch(() => {});
    }
  }

  apply(corrected) {
    if (this.view.file !== this.file || this.editor.getValue() !== this.snapshot) {
      new Notice('The note changed since the grammar check. Run Harper again.');
      this.close();
      return;
    }
    // Replace only the changed range, preserving the editor's undo history.
    let start = 0;
    while (start < this.snapshot.length && start < corrected.length && this.snapshot[start] === corrected[start]) start++;
    let end = this.snapshot.length, correctedEnd = corrected.length;
    while (end > start && correctedEnd > start && this.snapshot[end - 1] === corrected[correctedEnd - 1]) { end--; correctedEnd--; }
    this.editor.replaceRange(corrected.slice(start, correctedEnd), this.editor.offsetToPos(start), this.editor.offsetToPos(end));
    this.close();
  }

  onClose() { this.closed = true; this.contentEl.empty(); }
}

// main.js is the upstream distributed bundle; extend its exported plugin without
// modifying its generated internals. The command is registered with Obsidian.
export function extendPlugin(OriginalPlugin) {
return class PageMeldWithHarper extends OriginalPlugin {
  async onload() {
    await super.onload();
    this.addCommand({
      id: 'harper-grammar-check',
      name: 'Check grammar with Harper',
      editorCallback: (editor, view) => {
        if (!(view instanceof MarkdownView) || !view.file) return;
        const modal = new HarperModal(this, editor, view);
        modal.file = view.file;
        modal.open();
      },
    });
  }
};
}
