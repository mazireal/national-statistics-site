// Meridian Atlas data: national indicators for 14 countries.
// Latest values are World Bank World Development Indicators (2023, life
// expectancy and CO2 per capita 2022); series run 2014-2023.
export const YEARS = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

export const INDICATORS = [
  { key: 'pop', label: 'Population', unit: 'millions', year: 2023, source: 'World Bank WDI · UN DESA', decimals: 1 },
  { key: 'gdp', label: 'GDP', unit: 'US$ trillions', year: 2023, source: 'World Bank WDI', decimals: 2 },
  { key: 'gdppc', label: 'GDP per capita', unit: 'US$', year: 2023, source: 'World Bank WDI', decimals: 0, series: true },
  { key: 'life', label: 'Life expectancy', unit: 'years', year: 2022, source: 'World Bank WDI · WHO', decimals: 1, series: true },
  { key: 'literacy', label: 'Adult literacy', unit: '% of adults', year: 2023, source: 'UNESCO UIS via World Bank', decimals: 0 },
  { key: 'co2', label: 'CO2 per capita', unit: 'tonnes', year: 2022, source: 'Global Carbon Project via Our World in Data', decimals: 1, series: true, lowerBetter: true },
  { key: 'internet', label: 'Internet users', unit: '% of population', year: 2023, source: 'ITU via World Bank', decimals: 0 },
  { key: 'unemployment', label: 'Unemployment', unit: '% of labour force', year: 2023, source: 'ILO via World Bank', decimals: 1, lowerBetter: true },
];

export const COUNTRIES = [
  { code: 'USA', name: 'United States', flag: '🇺🇸', region: 'North America', capital: 'Washington, D.C.',
    pop: 335.0, gdp: 27.36, gdppc: 81695, life: 77.5, literacy: 99, co2: 14.0, internet: 95, unemployment: 3.6,
    s_gdppc: [55040, 56800, 57900, 60000, 63300, 65100, 63500, 70200, 77100, 81695],
    s_life: [78.9, 78.8, 78.5, 78.5, 78.7, 78.8, 77.0, 76.4, 77.5, 77.8],
    s_co2: [16.2, 15.7, 15.0, 14.6, 15.2, 14.7, 13.0, 13.8, 14.0, 13.8] },
  { code: 'CHN', name: 'China', flag: '🇨🇳', region: 'East Asia', capital: 'Beijing',
    pop: 1411.0, gdp: 17.79, gdppc: 12614, life: 78.6, literacy: 97, co2: 8.0, internet: 78, unemployment: 5.1,
    s_gdppc: [7680, 8080, 8100, 8850, 9900, 10300, 10500, 12700, 12720, 12614],
    s_life: [76.0, 76.3, 76.5, 76.7, 77.0, 77.3, 77.7, 78.2, 78.6, 78.8],
    s_co2: [7.4, 7.2, 7.1, 7.1, 7.4, 7.6, 7.7, 8.0, 8.0, 8.1] },
  { code: 'IND', name: 'India', flag: '🇮🇳', region: 'South Asia', capital: 'New Delhi',
    pop: 1428.6, gdp: 3.57, gdppc: 2485, life: 67.7, literacy: 76, co2: 2.0, internet: 46, unemployment: 4.2,
    s_gdppc: [1570, 1610, 1750, 1990, 2010, 2050, 1900, 2270, 2410, 2485],
    s_life: [67.4, 68.0, 68.6, 69.2, 69.7, 70.1, 68.9, 66.9, 67.7, 68.2],
    s_co2: [1.6, 1.7, 1.8, 1.8, 1.9, 1.9, 1.8, 1.9, 2.0, 2.1] },
  { code: 'JPN', name: 'Japan', flag: '🇯🇵', region: 'East Asia', capital: 'Tokyo',
    pop: 123.3, gdp: 4.21, gdppc: 33834, life: 84.8, literacy: 99, co2: 8.5, internet: 87, unemployment: 2.6,
    s_gdppc: [38400, 34500, 39100, 38800, 39300, 40200, 39900, 39300, 34000, 33834],
    s_life: [83.6, 83.8, 84.0, 84.2, 84.3, 84.6, 84.9, 84.5, 84.8, 84.9],
    s_co2: [9.8, 9.4, 9.1, 8.9, 8.8, 8.5, 8.0, 8.3, 8.5, 8.4] },
  { code: 'DEU', name: 'Germany', flag: '🇩🇪', region: 'Europe', capital: 'Berlin',
    pop: 84.7, gdp: 4.46, gdppc: 52746, life: 80.7, literacy: 99, co2: 7.3, internet: 93, unemployment: 3.1,
    s_gdppc: [48100, 41100, 42500, 44600, 47600, 46800, 47300, 51300, 48700, 52746],
    s_life: [81.0, 81.0, 81.1, 81.2, 81.2, 81.3, 81.2, 81.0, 80.7, 81.0],
    s_co2: [8.9, 8.9, 8.8, 8.6, 8.3, 7.8, 6.9, 7.3, 7.3, 6.8] },
  { code: 'GBR', name: 'United Kingdom', flag: '🇬🇧', region: 'Europe', capital: 'London',
    pop: 68.3, gdp: 3.34, gdppc: 48913, life: 81.3, literacy: 99, co2: 5.2, internet: 97, unemployment: 4.2,
    s_gdppc: [46800, 43900, 40000, 39800, 42900, 42300, 41100, 47900, 46100, 48913],
    s_life: [81.0, 81.1, 81.2, 81.2, 81.3, 81.3, 81.0, 80.7, 81.3, 81.4],
    s_co2: [6.5, 6.2, 5.7, 5.5, 5.4, 5.3, 4.6, 5.0, 5.2, 5.0] },
  { code: 'FRA', name: 'France', flag: '🇫🇷', region: 'Europe', capital: 'Paris',
    pop: 68.2, gdp: 3.05, gdppc: 44715, life: 82.5, literacy: 99, co2: 4.6, internet: 86, unemployment: 7.3,
    s_gdppc: [42900, 36600, 37500, 38600, 41700, 40500, 39000, 43700, 40900, 44715],
    s_life: [82.3, 82.2, 82.4, 82.5, 82.7, 82.9, 82.5, 82.3, 82.5, 82.6],
    s_co2: [4.8, 4.9, 4.8, 4.9, 4.7, 4.6, 4.0, 4.4, 4.6, 4.4] },
  { code: 'BRA', name: 'Brazil', flag: '🇧🇷', region: 'South America', capital: 'Brasília',
    pop: 216.4, gdp: 2.17, gdppc: 10044, life: 75.8, literacy: 94, co2: 2.3, internet: 84, unemployment: 7.8,
    s_gdppc: [12200, 8800, 8710, 9890, 8920, 8770, 6870, 7730, 9240, 10044],
    s_life: [74.9, 75.2, 75.5, 75.8, 76.1, 76.4, 75.9, 74.0, 75.8, 76.2],
    s_co2: [2.5, 2.4, 2.3, 2.2, 2.2, 2.2, 2.1, 2.2, 2.3, 2.3] },
  { code: 'CAN', name: 'Canada', flag: '🇨🇦', region: 'North America', capital: 'Ottawa',
    pop: 40.1, gdp: 2.14, gdppc: 53472, life: 81.7, literacy: 99, co2: 14.2, internet: 94, unemployment: 5.4,
    s_gdppc: [50300, 43300, 42300, 45100, 46200, 46200, 43200, 52200, 55500, 53472],
    s_life: [81.9, 82.0, 82.1, 82.2, 82.3, 82.4, 81.8, 81.3, 81.7, 81.9],
    s_co2: [15.8, 15.4, 15.1, 15.1, 15.4, 14.9, 13.8, 14.3, 14.2, 14.0] },
  { code: 'AUS', name: 'Australia', flag: '🇦🇺', region: 'Oceania', capital: 'Canberra',
    pop: 26.6, gdp: 1.72, gdppc: 64806, life: 83.2, literacy: 99, co2: 15.1, internet: 97, unemployment: 3.7,
    s_gdppc: [61900, 56500, 50300, 54000, 57200, 55000, 51900, 59400, 64600, 64806],
    s_life: [82.6, 82.7, 82.8, 82.9, 83.0, 83.1, 83.2, 83.3, 83.2, 83.3],
    s_co2: [16.9, 16.6, 16.5, 16.4, 16.6, 16.0, 15.2, 15.1, 15.1, 14.9] },
  { code: 'KOR', name: 'South Korea', flag: '🇰🇷', region: 'East Asia', capital: 'Seoul',
    pop: 51.7, gdp: 1.71, gdppc: 33121, life: 83.6, literacy: 98, co2: 11.6, internet: 98, unemployment: 2.7,
    s_gdppc: [27900, 27200, 29200, 31600, 33400, 31900, 31800, 35000, 32400, 33121],
    s_life: [81.9, 82.1, 82.3, 82.5, 82.7, 83.3, 83.5, 83.6, 83.6, 83.7],
    s_co2: [11.5, 11.4, 11.5, 11.7, 11.9, 11.8, 10.9, 11.5, 11.6, 11.3] },
  { code: 'IRN', name: 'Iran', flag: '🇮🇷', region: 'Middle East', capital: 'Tehran',
    pop: 89.2, gdp: 0.40, gdppc: 4508, life: 77.3, literacy: 89, co2: 8.3, internet: 79, unemployment: 9.0,
    s_gdppc: [5470, 5020, 5280, 5650, 4040, 3340, 3520, 4090, 4660, 4508],
    s_life: [75.4, 75.7, 76.0, 76.3, 76.6, 76.9, 76.8, 76.5, 77.3, 77.5],
    s_co2: [7.5, 7.6, 7.7, 7.8, 7.9, 8.0, 7.9, 8.2, 8.3, 8.4] },
  { code: 'TUR', name: 'Türkiye', flag: '🇹🇷', region: 'Middle East', capital: 'Ankara',
    pop: 85.3, gdp: 1.11, gdppc: 12985, life: 77.2, literacy: 97, co2: 5.9, internet: 86, unemployment: 9.4,
    s_gdppc: [12200, 11000, 10900, 10600, 9560, 9130, 8540, 9540, 10670, 12985],
    s_life: [76.8, 77.1, 77.4, 77.7, 78.0, 78.3, 77.4, 76.6, 77.2, 77.4],
    s_co2: [4.5, 4.7, 5.0, 5.2, 5.2, 5.1, 5.2, 5.7, 5.9, 6.0] },
  { code: 'NGA', name: 'Nigeria', flag: '🇳🇬', region: 'Africa', capital: 'Abuja',
    pop: 223.8, gdp: 0.36, gdppc: 1621, life: 53.6, literacy: 62, co2: 0.6, internet: 45, unemployment: 5.0,
    s_gdppc: [3200, 2690, 2190, 1970, 2110, 2230, 2080, 2130, 2210, 1621],
    s_life: [52.0, 52.3, 52.6, 52.9, 53.1, 53.3, 53.1, 53.3, 53.6, 53.8],
    s_co2: [0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6] },
];

export function countryByCode(code) {
  return COUNTRIES.find((c) => c.code === code) || COUNTRIES[0];
}
export function indicatorByKey(key) {
  return INDICATORS.find((i) => i.key === key) || INDICATORS[2];
}
export function formatValue(ind, value) {
  if (value === null || value === undefined) return '—';
  const fixed = Number(value).toFixed(ind.decimals);
  return Number(fixed).toLocaleString('en-US', { minimumFractionDigits: ind.decimals, maximumFractionDigits: ind.decimals });
}
export function rankOf(code, key) {
  const sorted = [...COUNTRIES].sort((a, b) => b[key] - a[key]);
  return sorted.findIndex((c) => c.code === code) + 1;
}
