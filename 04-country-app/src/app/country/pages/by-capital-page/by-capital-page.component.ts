import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryService } from '../../services/country.service';
import { RESTCountry } from '../../interfaces/rest-country-response.interface';
import { Country } from '../../interfaces/country.interface';
import { CountryMapper } from '../../mappers/country.mapper';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<Country[]>([]);

  onSearch(query: string) {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query).subscribe((resp) => {
      this.isLoading.set(false);
      this.countries.set(resp.map(CountryMapper.mapRestCountryToCountry));

      console.log(resp);
    });
  }
}
