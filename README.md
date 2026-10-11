# PageMeld

### Organization and Personalization Engine for your notes

[![Discord Chat](https://img.shields.io/discord/799706244264362024?color=748AD9&label=discord%20chat)](https://make.md/community) [![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22make-md%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json)](obsidian://show-plugin?id=make-md)

> **Compatibility:** PageMeld keeps the Obsidian plugin ID `make-md` and its existing settings folder so current installations remain compatible. The inherited community/documentation URLs are retained until replacement PageMeld links are available.

| ![m1_1.png](https://github.com/Make-md/makemd-docs/blob/main/assets/images/m1_1.png?raw=true) | ![m1_2.png](https://github.com/Make-md/makemd-docs/blob/main/assets/images/m1_2.png?raw=true) |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| ![m1_3.png](https://github.com/Make-md/makemd-docs/blob/main/assets/images/m1_3.png?raw=true) | ![m1_4.png](https://github.com/Make-md/makemd-docs/blob/main/assets/images/m1_4.png?raw=true) |

PageMeld comes with everything you need to organize, label and personalize your notes inside Obsidian without any additional code or 3rd party dependencies. Designed for simplicity and ease-of-use and scales up to any complexity with databases, formulas and two-way relationships.

### Notion-style block editing

PageMeld now includes block-aware editing directly in the plugin: hover `+` and grip handles, whole-block drag and drop (including nested content), multi-block selection, block-aware keyboard behavior, folding, and a configurable slash insert menu. Each major feature can be disabled in **Settings → PageMeld → Notion-style block editing**; the section also has a master switch. On Obsidian mobile, handles are pinned to the caret by default (tap the grip for actions; press and hold it to drag), with a separate **Enable block handles on mobile** switch. Settings lists can be reordered by drag on desktop or with the up/down buttons on touch. Keyboard shortcuts such as block-aware Cmd+A/Backspace still require a hardware keyboard on mobile. No separate block-editing plugin is required. If you also have the standalone Feel the Notion plugin installed, disable it to avoid duplicate handles and editor extensions.

This integration adapts Feel the Notion 0.7.0, licensed under MIT; see `Feel-the-Notion-LICENSE.txt` in the release package.

Slash Inserter 0.1.3 commands are merged into the existing typed `/` menu only. The `+` menu and Feel the Notion settings screens remain unchanged. Commands include bullets, numbered lists, quotes, embeds, video/iframe prompts, Mermaid, named sub-pages, and rich link cards; existing PageMeld rows supply headings, tasks, tables, callouts, code, math, and links. Disable the standalone Slash Inserter plugin after installing this build to avoid duplicate `/` menus. The upstream MIT notice is included as `Slash-Inserter-LICENSE.txt`.

### Inline header properties

When **Show Context Properties in Header** is enabled, PageMeld keeps its header property rows and hides Obsidian’s duplicate Properties panel in Live Preview. Disabling that setting restores Obsidian’s native Properties panel.

### Journal Calendar placement

The Journal Calendar opens in the **right sidebar by default**. Use **Settings → PageMeld → Navigator → Journal Calendar on Right** to switch it to the left. Changing the toggle moves an already-open calendar, and PageMeld keeps only one calendar instance. **Enable Journal Calendar** turns the ribbon entry and view on or off. The calendar groups notes by a valid YAML `created` frontmatter date first, then an ISO daily-note filename such as `2026-05-29`, and finally file creation/modification timestamps. Double-click a date to open or create its journal note.

### Page icons from frontmatter

PageMeld reads page icons from its `sticker` frontmatter field and recognizes `icon` as a fallback for migrated notes (for example, `icon: 📚`). The Navigator and page header display the icon. When you change it in PageMeld, an existing `icon` property is updated; new notes continue to use `sticker`.

### 🌳 Remove Clutter and Stay Focused

Organize your notes to quickly focus on what you're working on or into specific categories.

### 🍱 Quick Organization with List, Tables, Calendars and Boards

Visualize your information anyway you want with customizable list views from your notes, use different views for different parts of your workflow with custom filters, sorting and grouping.

### 🧩 Databases with Two-way Relations, Formulas and Rollups

Use simple tables or powerful databases to connect your data across your notes and visualize them in different ways to gain deeper insights into your knowledge.

### 🎨 A Completely Personalizable Workspace

Express your creativity and customize your workspaces into dashboards, trackers and more, all without any code.

---

Join [our Discord community](https://make.md/community), so we can hear your feedback and use cases.

---

**Looking for markdown editing tools for Obsidian and editable embeds?**
Flow Blocks and Flow Styler are still part of PageMeld as PageMeld Basics, but will soon become its own plug-in.

---

## Credits

Thank you for everyone in the Obsidian community that have contributed to testing and bug reporting.

Parts of the Flow Editor is based on Hover Editor
https://github.com/nothingislost/obsidian-hover-editor

Dataview syncing adapted with the help of Metadata Menu
https://github.com/mdelobelle/metadatamenu

Some of our inspiration came from the following projects
https://github.com/chetachiezikeuzor/cMenu-Plugin
https://github.com/ozntel/file-tree-alternative
