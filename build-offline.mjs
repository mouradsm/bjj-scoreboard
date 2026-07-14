// Generates offline/Placar BJJ.html from index.html by stripping the PWA-only
// bits (manifest link, external icon links, service-worker registration).
// The offline build stays a single self-contained file: embedded fonts +
// embedded favicon, zero external requests, works by double-click (file://).
//
// Usage: node build-offline.mjs
import fs from 'node:fs';

const SRC = 'index.html';
const OUT = 'offline/Placar BJJ.html';

let html = fs.readFileSync(SRC, 'utf8');

// 1) remove PWA-only <link> lines (keep the embedded data: favicon + metas)
html = html.replace(/\n[ \t]*<link rel="manifest"[^>]*>/, '');
html = html.replace(/\n[ \t]*<link rel="icon" type="image\/png" sizes="32x32"[^>]*>/, '');
html = html.replace(/\n[ \t]*<link rel="apple-touch-icon"[^>]*>/, '');

// 2) remove the service-worker registration <script> block entirely
const marker = '<script>\n(function () {\n  if (!("serviceWorker" in navigator)) return;';
const start = html.indexOf(marker);
if (start === -1) throw new Error('SW registration block not found — did index.html change shape?');
const end = html.indexOf('</script>', start) + '</script>'.length;
html = html.slice(0, start) + html.slice(end);
// tidy any leftover blank lines before </body>
html = html.replace(/\n{3,}<\/body>/, '\n</body>');

// 3) safety assertions — the offline file must be fully self-contained
const problems = [];
if (/serviceWorker/.test(html)) problems.push('still references serviceWorker');
if (/manifest\.webmanifest/.test(html)) problems.push('still links the manifest');
if (/icons\//.test(html)) problems.push('still references external icons/');
if (/fonts\.(googleapis|gstatic)/.test(html)) problems.push('references Google Fonts');
if (!/data:image\/png;base64,/.test(html)) problems.push('missing embedded favicon');
if (!/data:font\/woff2;base64,/.test(html)) problems.push('missing embedded fonts');
if (!/data-i18n=/.test(html)) problems.push('missing i18n markup');
if (problems.length) throw new Error('offline build invalid:\n - ' + problems.join('\n - '));

fs.writeFileSync(OUT, html);
console.log('wrote', OUT, '(' + (html.length / 1024).toFixed(1) + ' KB)');
