import { Component } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryListComponent, CountrySearchInputComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  onSearch(value: string) {
    console.log(value);
  }
}
