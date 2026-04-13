import * as countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(enLocale);

export function getCountryFlagUrl(countryName: string): string | null {
  const code = countries.getAlpha2Code(countryName, 'en');
  if (!code) return null;
  
  return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
}
