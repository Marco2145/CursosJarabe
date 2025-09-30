import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-country-response.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    const myCountry: Country = {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      // name: restCountry.name.common,
      name: restCountry.translations['spa'].common ?? restCountry.name.common ?? 'No name',
      capital: restCountry.capital.join(', '),
      population: restCountry.population,

      region: restCountry.region,
      subRegion: restCountry.subregion,
    };
    return myCountry;
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(CountryMapper.mapRestCountryToCountry);
  }
}
