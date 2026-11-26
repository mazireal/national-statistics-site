// Page renderers: overview, country profile, comparison, rankings, sources.
import { COUNTRIES, INDICATORS, YEARS, countryByCode, indicatorByKey, formatValue, rankOf } from './data.js';
import { lineChart, sparkline, barList } from './charts.js';

const COLORS = ['#0e7c7b', '#d95d4e', '#2f6fb2', '#e8a13a'];

function h(tag, cls, textContent) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (textContent !== undefined) n.textContent = textContent;
  return n;
}
function kpiCard(label, value, source) {
  const card = h('div', 'kpi');
  card.append(h('div', 'lab', label), h('div', 'num', value), h('div', 'src', source));
  return card;
}
function countryOptions(select, chosen) {
  for (const c of COUNTRIES) {
    const o = document.createElement('option');
    o.value = c.code;
    o.textContent = `${c.flag} ${c.name}`;
    if (c.code === chosen) o.selected = true;
    select.append(o);
  }
}
function indicatorOptions(select, chosen, seriesOnly) {
  for (const ind of INDICATORS) {
    if (seriesOnly && !ind.series) continue;
    const o = document.createElement('option');
    o.value = ind.key;
    o.textContent = `${ind.label} (${ind.unit})`;
    if (ind.key === chosen) o.selected = true;
    select.append(o);
  }
}

export function renderOverview(root) {
  root.replaceChildren();
  root.append(h('p', 'kicker', 'National statistics · 14 countries · 8 indicators'));
  root.append(h('h1', null, 'A country, in numbers'));
  root.append(h('p', 'lede', 'Population, economy, health, education and environment for 14 countries — every figure with its source and year, charts you can steer, and side-by-side comparisons. Pick a country to start.'));

  const totalPop = COUNTRIES.reduce((s, c) => s + c.pop, 0);
  const kpis = h('div', 'kpi-row');
  kpis.append(
    kpiCard('Countries covered', '14', 'Asia, Europe, the Americas, Africa, Oceania'),
    kpiCard('Combined population', formatValue(indicatorByKey('pop'), totalPop) + 'M', 'World Bank WDI · 2023'),
    kpiCard('Longest life expectancy', '84.8 yrs', 'Japan · World Bank WDI · 2022'),
    kpiCard('Highest GDP per capita', 'US$81,695', 'United States · World Bank WDI · 2023'),
  );
  root.append(kpis);

  const panel = h('section', 'panel');
  const head = h('div', 'panel-head');
  head.append(h('h3', null, 'Trend explorer — ten years, any country'));
  panel.append(head);
  const controls = h('div', 'controls');
  const cLabel = h('label', null, 'Country ');
  const cSel = document.createElement('select');
  countryOptions(cSel, 'JPN');
  cLabel.append(cSel);
  const iLabel = h('label', null, 'Indicator ');
  const iSel = document.createElement('select');
  indicatorOptions(iSel, 'gdppc', true);
  iLabel.append(iSel);
  controls.append(cLabel, iLabel);
  panel.append(controls);
  const chartBox = h('div');
  const note = h('p', 'chart-note');
  panel.append(chartBox, note);
  const draw = () => {
    const c = countryByCode(cSel.value);
    const ind = indicatorByKey(iSel.value);
    chartBox.replaceChildren(lineChart({
      years: YEARS,
      series: [{ values: c['s_' + ind.key], color: COLORS[0] }],
      format: (v) => formatValue(ind, v),
    }));
    note.textContent = `${c.name} · ${ind.label} (${ind.unit}), 2014–2023 · Source: ${ind.source}. Latest: ${formatValue(ind, c[ind.key])} ${ind.unit} (${ind.year}), ranked #${rankOf(c.code, ind.key)} of 14.`;
  };
  cSel.addEventListener('change', draw);
  iSel.addEventListener('change', draw);
  draw();
  root.append(panel);

  root.append(h('h2', null, 'Browse countries'));
  const searchRow = h('div', 'controls');
  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = 'Search a country or region…';
  search.setAttribute('aria-label', 'Search countries');
  searchRow.append(search);
  root.append(searchRow);
  const grid = h('div', 'grid');
  const drawGrid = () => {
    grid.replaceChildren();
    const q = search.value.trim().toLowerCase();
    for (const c of COUNTRIES) {
      if (q && !(c.name + ' ' + c.region).toLowerCase().includes(q)) continue;
      const card = h('a', 'ccard');
      card.href = '#/country/' + c.code;
      card.append(h('span', 'flag', c.flag), h('h3', null, c.name));
      card.append(h('p', 'chart-note', `${c.region} · Capital ${c.capital}`));
      card.append(sparkline(c.s_gdppc));
      const stats = h('div', 'stats');
      const s1 = h('span'); s1.innerHTML = `<b>${formatValue(indicatorByKey('pop'), c.pop)}M</b>Population 2023`;
      const s2 = h('span'); s2.innerHTML = `<b>US$${formatValue(indicatorByKey('gdppc'), c.gdppc)}</b>GDP per capita`;
      const s3 = h('span'); s3.innerHTML = `<b>${formatValue(indicatorByKey('life'), c.life)}</b>Life expectancy`;
      stats.append(s1, s2, s3);
      card.append(stats);
      grid.append(card);
    }
    if (!grid.children.length) grid.append(h('p', 'chart-note', 'No country matches that search. Try “Asia” or “Brazil”.'));
  };
  search.addEventListener('input', drawGrid);
  drawGrid();
  root.append(grid);
}

export function renderCountry(root, code) {
  const c = countryByCode(code);
  root.replaceChildren();
  root.append(h('p', 'kicker', `${c.region} · Capital ${c.capital}`));
  root.append(h('h1', null, `${c.flag} ${c.name}`));
  root.append(h('p', 'lede', `The headline figures for ${c.name}, each with its source and year, followed by ten-year trends and where the country ranks among the 14 covered here.`));

  const kpis = h('div', 'kpi-row');
  kpis.append(
    kpiCard('Population', formatValue(indicatorByKey('pop'), c.pop) + 'M', `World Bank WDI · 2023 · #${rankOf(c.code, 'pop')} of 14`),
    kpiCard('GDP per capita', 'US$' + formatValue(indicatorByKey('gdppc'), c.gdppc), `World Bank WDI · 2023 · #${rankOf(c.code, 'gdppc')} of 14`),
    kpiCard('Life expectancy', formatValue(indicatorByKey('life'), c.life) + ' yrs', `World Bank WDI · 2022 · #${rankOf(c.code, 'life')} of 14`),
    kpiCard('CO2 per capita', formatValue(indicatorByKey('co2'), c.co2) + ' t', `Global Carbon Project · 2022 · #${rankOf(c.code, 'co2')} highest`),
  );
  root.append(kpis);

  const charts = h('div', 'two-col');
  const mkPanel = (title, key, color) => {
    const ind = indicatorByKey(key);
    const p = h('section', 'panel');
    p.append(h('h3', null, title));
    p.append(lineChart({ years: YEARS, series: [{ values: c['s_' + key], color }], height: 210, format: (v) => formatValue(ind, v) }));
    p.append(h('p', 'chart-note', `${ind.label} (${ind.unit}), 2014–2023 · Source: ${ind.source}.`));
    return p;
  };
  charts.append(mkPanel('Income trend', 'gdppc', COLORS[0]), mkPanel('Health trend', 'life', COLORS[2]));
  root.append(charts);
  const envPanel = mkPanel('Environment trend', 'co2', COLORS[1]);
  root.append(envPanel);

  const tablePanel = h('section', 'panel');
  tablePanel.append(h('h3', null, 'All indicators'));
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr><th>Indicator</th><th class="n">Value</th><th>Unit</th><th class="n">Year</th><th class="n">Rank of 14</th><th>Source</th></tr>';
  const tbody = document.createElement('tbody');
  for (const ind of INDICATORS) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${ind.label}</td><td class="n">${formatValue(ind, c[ind.key])}</td><td>${ind.unit}</td><td class="n">${ind.year}</td><td class="n">#${rankOf(c.code, ind.key)}</td><td>${ind.source}</td>`;
    tbody.append(tr);
  }
  table.append(thead, tbody);
  tablePanel.append(table);
  const actions = h('div', 'controls');
  const cmp = h('a', null, 'Compare ' + c.name + ' with another country →');
  cmp.href = '#/compare';
  actions.append(cmp);
  tablePanel.append(actions);
  root.append(tablePanel);
}

export function renderCompare(root) {
  root.replaceChildren();
  root.append(h('p', 'kicker', 'Side by side'));
  root.append(h('h1', null, 'Compare two countries'));
  root.append(h('p', 'lede', 'Choose any pair. The chart follows one indicator over ten years; the table lines up all eight, with the gap between them.'));

  const panel = h('section', 'panel');
  const controls = h('div', 'controls');
  const aLabel = h('label', null, 'Country A ');
  const aSel = document.createElement('select');
  countryOptions(aSel, 'JPN');
  aLabel.append(aSel);
  const bLabel = h('label', null, 'Country B ');
  const bSel = document.createElement('select');
  countryOptions(bSel, 'DEU');
  bLabel.append(bSel);
  const iLabel = h('label', null, 'Chart indicator ');
  const iSel = document.createElement('select');
  indicatorOptions(iSel, 'gdppc', true);
  iLabel.append(iSel);
  const swap = h('button', 'ghost', 'Swap A and B');
  controls.append(aLabel, bLabel, iLabel, swap);
  panel.append(controls);
  const chartBox = h('div');
  const legend = h('div', 'legend');
  const tableBox = h('div');
  panel.append(chartBox, legend, tableBox);
  root.append(panel);

  const draw = () => {
    const a = countryByCode(aSel.value);
    const b = countryByCode(bSel.value);
    const ind = indicatorByKey(iSel.value);
    chartBox.replaceChildren(lineChart({
      years: YEARS,
      series: [
        { values: a['s_' + ind.key], color: COLORS[0] },
        { values: b['s_' + ind.key], color: COLORS[1] },
      ],
      format: (v) => formatValue(ind, v),
    }));
    legend.replaceChildren();
    const la = h('span'); la.innerHTML = `<i style="background:${COLORS[0]}"></i>${a.flag} ${a.name}`;
    const lb = h('span'); lb.innerHTML = `<i style="background:${COLORS[1]}"></i>${b.flag} ${b.name}`;
    legend.append(la, lb, h('span', null, `${ind.label} (${ind.unit}), 2014–2023 · ${ind.source}`));

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = `<tr><th>Indicator</th><th class="n">${a.name}</th><th class="n">${b.name}</th><th class="n">Gap (A − B)</th><th class="n">Year</th></tr>`;
    const tbody = document.createElement('tbody');
    for (const row of INDICATORS) {
      const gap = a[row.key] - b[row.key];
      const tr = document.createElement('tr');
      const cls = gap === 0 ? '' : (gap > 0) !== !!row.lowerBetter ? 'delta-up' : 'delta-down';
      tr.innerHTML = `<td>${row.label} (${row.unit})</td><td class="n">${formatValue(row, a[row.key])}</td><td class="n">${formatValue(row, b[row.key])}</td><td class="n ${cls}">${gap > 0 ? '+' : ''}${formatValue(row, gap)}</td><td class="n">${row.year}</td>`;
      tbody.append(tr);
    }
    table.append(thead, tbody);
    tableBox.replaceChildren(table);
  };
  aSel.addEventListener('change', draw);
  bSel.addEventListener('change', draw);
  iSel.addEventListener('change', draw);
  swap.addEventListener('click', () => { const t = aSel.value; aSel.value = bSel.value; bSel.value = t; draw(); });
  draw();
}

export function renderRankings(root) {
  root.replaceChildren();
  root.append(h('p', 'kicker', 'League tables'));
  root.append(h('h1', null, 'Rankings'));
  root.append(h('p', 'lede', 'All 14 countries ranked on any indicator. Flip the order, or search to pull one country out of the list. Every bar links to that country’s full profile.'));

  const panel = h('section', 'panel');
  const controls = h('div', 'controls');
  const iLabel = h('label', null, 'Indicator ');
  const iSel = document.createElement('select');
  indicatorOptions(iSel, 'gdppc', false);
  iLabel.append(iSel);
  const orderBtn = h('button', 'ghost', 'Order: highest first');
  const search = document.createElement('input');
  search.type = 'search';
  search.placeholder = 'Filter countries…';
  search.setAttribute('aria-label', 'Filter countries');
  controls.append(iLabel, orderBtn, search);
  panel.append(controls);
  const note = h('p', 'chart-note');
  const listBox = h('div');
  panel.append(note, listBox);
  root.append(panel);

  let descending = true;
  const draw = () => {
    const ind = indicatorByKey(iSel.value);
    const q = search.value.trim().toLowerCase();
    const rows = [...COUNTRIES]
      .sort((a, b) => (descending ? b[ind.key] - a[ind.key] : a[ind.key] - b[ind.key]))
      .filter((c) => !q || (c.name + ' ' + c.region).toLowerCase().includes(q))
      .map((c) => ({ name: c.name, flag: c.flag, value: c[ind.key], code: c.code }));
    listBox.replaceChildren();
    if (!rows.length) {
      listBox.append(h('p', 'chart-note', 'No country matches that filter.'));
    } else {
      const bars = barList(rows, (v) => formatValue(ind, v) + ' ' + ind.unit);
      [...bars.children].forEach((row, i) => {
        row.style.cursor = 'pointer';
        row.title = 'Open ' + rows[i].name;
        row.addEventListener('click', () => { location.hash = '#/country/' + rows[i].code; });
      });
      listBox.append(bars);
    }
    note.textContent = `${ind.label} (${ind.unit}) · ${ind.year} · Source: ${ind.source}. ${ind.lowerBetter ? 'Lower is better on this indicator.' : ''} Click a bar for the country profile.`;
  };
  iSel.addEventListener('change', draw);
  search.addEventListener('input', draw);
  orderBtn.addEventListener('click', () => {
    descending = !descending;
    orderBtn.textContent = descending ? 'Order: highest first' : 'Order: lowest first';
    draw();
  });
  draw();
}

export function renderAbout(root) {
  root.replaceChildren();
  root.append(h('p', 'kicker', 'Provenance'));
  root.append(h('h1', null, 'Sources and methods'));
  root.append(h('p', 'lede', 'Meridian Atlas holds its figures in its own files and loads nothing from the network. This page says where each figure comes from, so any number here can be checked at its source.'));

  const panel = h('section', 'panel');
  panel.append(h('h3', null, 'Indicator sources'));
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  thead.innerHTML = '<tr><th>Indicator</th><th>Unit</th><th class="n">Reference year</th><th>Source</th></tr>';
  const tbody = document.createElement('tbody');
  for (const ind of INDICATORS) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${ind.label}</td><td>${ind.unit}</td><td class="n">${ind.year}</td><td>${ind.source}</td>`;
    tbody.append(tr);
  }
  table.append(thead, tbody);
  panel.append(table);
  root.append(panel);

  const notes = h('section', 'panel');
  notes.append(h('h3', null, 'How to read this site'));
  const items = [
    'Rankings run across the 14 countries covered here, not the whole world; a rank of #1 means first among these 14.',
    'Trend charts cover 2014–2023 for GDP per capita, life expectancy and CO2 per capita; the latest point matches the headline figure and its source.',
    'GDP is in current US dollars, so exchange-rate swings (for example Japan and Nigeria in 2023) move the line as well as real growth.',
    'CO2 per capita and unemployment are marked “lower is better” in comparisons; every other indicator reads higher-is-more.',
    'Literacy is the adult rate (age 15+) from UNESCO’s Institute for Statistics as carried by the World Bank; reference years vary by country and are grouped under 2023.',
  ];
  const ul = document.createElement('ul');
  for (const t of items) ul.append(h('li', null, t));
  notes.append(ul);
  notes.append(h('p', 'chart-note', 'Primary sources: World Bank World Development Indicators; UN DESA World Population Prospects; WHO Global Health Observatory; UNESCO Institute for Statistics; Global Carbon Project via Our World in Data; ITU; ILOSTAT.'));
  root.append(notes);
}
