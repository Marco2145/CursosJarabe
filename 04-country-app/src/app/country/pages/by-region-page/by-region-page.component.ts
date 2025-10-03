import { Component, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of, catchError } from 'rxjs';
import { CountryService } from '../../services/country.service';

function queryParamValidation(query: string, regions: Region[]): Region {
  // Capitalizamos la query de AaAaAAaa -> Aaaaaaaa
  let capitalizedQuery: string = query.toLowerCase();
  capitalizedQuery = capitalizedQuery.charAt(0).toUpperCase() + capitalizedQuery.slice(1);

  if (regions.includes(capitalizedQuery as Region)) {
    return capitalizedQuery as Region;
  } else return 'Africa'; // Valor por default
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam: string = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania', 'Antarctic'];
  selectedRegion = linkedSignal<Region | null>(() => {
    return queryParamValidation(this.queryParam, this.regions);
  });
  countryService = inject(CountryService);

  selectRegion(region: Region) {
    this.selectedRegion.set(region);
  }

  // Con rxResource
  countryResource = rxResource({
    params: () => ({ query: this.selectedRegion() }),
    stream: ({ params }) => {
      if (!params.query) return of([]);

      // Actualizar el URL
      this.router.navigate(['/country/by-region'], {
        queryParams: {
          query: params.query,
          // hola: 'mundo',
        },
      });

      return this.countryService.searchByRegion(params.query).pipe(
        catchError((error) => {
          console.error(error);
          return of([]);
        })
      );
    },
  });
}
