// Inline SVG chart builders: line trends, comparison bars, sparklines.
const NS = 'http://www.w3.org/2000/svg';

function el(name, attrs) {
  const node = document.createElementNS(NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  return node;
}
function text(x, y, str, anchor, size, fill) {
  const t = el('text', { x, y, 'text-anchor': anchor || 'middle', 'font-size': size || 11, fill: fill || '#5b6b7c', 'font-family': 'Verdana, sans-serif' });
  t.textContent = str;
  return t;
}
function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  return Math.ceil(v / p) * p;
}

export function lineChart({ years, series, height = 260, format }) {
  const W = 720, H = height, L = 64, R = 16, T = 16, B = 34;
  const all = series.flatMap((s) => s.values);
  const max = niceMax(Math.max(...all) * 1.08);
  const min = Math.min(0, Math.min(...all));
  const x = (i) => L + (i * (W - L - R)) / (years.length - 1);
  const y = (v) => T + ((max - v) * (H - T - B)) / (max - min);
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', role: 'img' });
  for (let g = 0; g <= 4; g++) {
    const gv = min + ((max - min) * g) / 4;
    svg.append(el('line', { x1: L, x2: W - R, y1: y(gv), y2: y(gv), stroke: '#e3ded2', 'stroke-width': 1 }));
    svg.append(text(L - 8, y(gv) + 4, format(gv), 'end'));
  }
  years.forEach((yr, i) => { if (i % 2 === 0 || i === years.length - 1) svg.append(text(x(i), H - 10, String(yr))); });
  for (const s of series) {
    const pts = s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ');
    svg.append(el('polyline', { points: pts, fill: 'none', stroke: s.color, 'stroke-width': 3, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    s.values.forEach((v, i) => svg.append(el('circle', { cx: x(i), cy: y(v), r: 3.4, fill: s.color })));
    const last = s.values[s.values.length - 1];
    svg.append(text(x(years.length - 1) - 4, y(last) - 10, format(last), 'end', 12, s.color));
  }
  return svg;
}

export function sparkline(values, color = '#0e7c7b') {
  const W = 160, H = 44, pad = 4;
  const max = Math.max(...values), min = Math.min(...values);
  const span = max - min || 1;
  const x = (i) => pad + (i * (W - pad * 2)) / (values.length - 1);
  const y = (v) => H - pad - ((v - min) * (H - pad * 2)) / span;
  const svg = el('svg', { viewBox: `0 0 ${W} ${H}`, width: '100%', height: H, 'aria-hidden': 'true' });
  const area = values.map((v, i) => `${x(i)},${y(v)}`).join(' ');
  svg.append(el('polygon', { points: `${pad},${H - pad} ${area} ${W - pad},${H - pad}`, fill: color, opacity: 0.14 }));
  svg.append(el('polyline', { points: area, fill: 'none', stroke: color, 'stroke-width': 2.4, 'stroke-linejoin': 'round' }));
  return svg;
}

export function barList(rows, format) {
  const wrap = document.createElement('div');
  const max = Math.max(...rows.map((r) => r.value)) || 1;
  for (const r of rows) {
    const row = document.createElement('div');
    row.className = 'bar-row';
    const name = document.createElement('span');
    name.textContent = `${r.flag} ${r.name}`;
    const track = document.createElement('div');
    track.className = 'bar-track';
    const fill = document.createElement('div');
    fill.className = 'bar-fill';
    fill.style.width = Math.max(2, (r.value / max) * 100) + '%';
    track.append(fill);
    const val = document.createElement('span');
    val.style.textAlign = 'right';
    val.textContent = format(r.value);
    row.append(name, track, val);
    wrap.append(row);
  }
  return wrap;
}
