# Meridian Atlas — National Statistics Explorer

![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)
![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/mazireal/national-statistics-site/rank.svg)
![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/mazireal/national-statistics-site/reward.svg)

Entry for the make.fun bounty [Make the best national statistics site](https://make.fun/c/best-national-statistics-site-20261126-0539).

Meridian Atlas explores the national statistics of 14 countries — population,
GDP, GDP per capita, life expectancy, adult literacy, CO2 per capita, internet
use and unemployment — with every figure carrying its source and year
(World Bank World Development Indicators, UN DESA, WHO, UNESCO, ITU, ILO and
the Global Carbon Project).

## What is inside

- **Overview** — headline totals, a ten-year trend explorer (any country,
  three indicators), and searchable country cards with income sparklines.
- **Country profiles** — KPI cards with ranks, income / health / environment
  trend charts, and a full indicator table with sources and years.
- **Compare** — any two countries side by side: a dual trend chart plus an
  eight-indicator table with the gap between them.
- **Rankings** — all 14 countries ranked on any indicator, reversible order,
  text filter, bars linking to profiles.
- **Sources** — provenance for every indicator and notes on how to read
  ranks, trends and current-dollar GDP.

The site is plain static files under `app/` with no build step and no network
requests. Preview it with `node serve.ts`, then open http://localhost:8080.
Hand it in with `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.

## License

MIT — see LICENSE.
