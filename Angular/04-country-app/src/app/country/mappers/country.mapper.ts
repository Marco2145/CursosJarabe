import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-country-response.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    const myCountry: Country = {
      cca2: restCountry.cca2 ?? '* No cca2 *',
      flag: restCountry.flag ?? '* No flag *',
      flagSvg: restCountry.flags.svg ?? '* No flagSvg *',
      // name: restCountry.name.common,
      name: restCountry.translations['spa'].common ?? restCountry.name.common ?? '* No name *',
      // Debo revisar primero si existe el string antes de hacer la operación de join
      capital: restCountry.capital?.join(', ') ?? '* No capital *',
      // capital: restCountry.capital?.length ? restCountry.capital.join(', ') : '* No capital *',
      population: restCountry.population ?? 0,

      region: restCountry.region ?? '* No region *',
      subRegion: restCountry.subregion ?? '* No subregion *',
    };
    return myCountry;
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(CountryMapper.mapRestCountryToCountry);
  }
}
