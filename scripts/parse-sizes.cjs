const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, '../dist/stats.html');
if (!fs.existsSync(file)) {
  console.error('stats.html not found:', file);
  process.exit(1);
}
const s = fs.readFileSync(file, 'utf8');
const re = /"name":"([^"]+)","size":([0-9]+)/g;
let m;
const map = new Map();
while ((m = re.exec(s)) !== null) {
  const name = m[1];
  const size = parseInt(m[2], 10);
  if (name.includes('node_modules/')) {
    const pkg = name.split('node_modules/')[1].split('/')[0];
    map.set(pkg, (map.get(pkg) || 0) + size);
  }
}
const arr = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 40);
if (arr.length === 0) {
  console.error('No node_modules size entries found in stats.html');
  process.exit(1);
}
arr.forEach(([pkg, size]) => console.log(`${pkg} ${size}`));
