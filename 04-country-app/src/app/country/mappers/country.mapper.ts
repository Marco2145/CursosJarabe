import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-country-response.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    const myCountry: Country = {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      capital: restCountry.capital.toString(), // !! REVISAR
      population: restCountry.population,
    };
    return myCountry;
  }

  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
