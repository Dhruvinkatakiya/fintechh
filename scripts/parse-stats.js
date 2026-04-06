const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../dist/stats.html');
if (!fs.existsSync(file)) {
  console.error('stats.html not found:', file);
  process.exit(1);
}
const s = fs.readFileSync(file, 'utf8');
const re = /node_modules\/([^"'<>\s]+)/g;
let m;
const arr = [];
while ((m = re.exec(s)) !== null) {
  arr.push(m[1]);
}
const counts = arr.reduce((acc, k) => { acc[k] = (acc[k] || 0) + 1; return acc; }, {});
const out = Object.entries(counts).sort((a,b) => b[1]-a[1]).slice(0,40).map(([k,v]) => `${v} ${k}`).join('\n');
console.log(out);
