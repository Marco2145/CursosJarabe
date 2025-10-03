import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { catchError, delay, firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country-page',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam: string = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = signal(this.queryParam);

  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
  //   loader: async ({ params }) => {
  //     if (!params.query) return [];

  //     return await firstValueFrom(this.countryService.searchByCountry(params.query));
  //   },
  // });

  // Con rxResource
  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      // Actualizar el URL
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: params.query,
          // hola: 'mundo',
        },
      });

      return this.countryService.searchByCountry(params.query).pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        })
      );
    },
  });
}
