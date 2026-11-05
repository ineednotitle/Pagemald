const fs = require('node:fs');
const esbuild = require('esbuild');
const marker = '\n/* PAGEMELD HARPER INTEGRATION START */\n';
(async () => {
  const main = fs.readFileSync('main.js', 'utf8').split(marker)[0];
  const result = await esbuild.build({ entryPoints: ['src/harper.js'], bundle: true, platform: 'node', format: 'iife', globalName: 'PageMeldHarperIntegration', external: ['obsidian'], write: false, minify: true, target: 'es2020' });
  fs.writeFileSync('main.js', main + marker + result.outputFiles[0].text + '\nmodule.exports = { ...module.exports, default: PageMeldHarperIntegration.extendPlugin(module.exports.default) };\n');
})().catch(error => { console.error(error); process.exitCode = 1; });
