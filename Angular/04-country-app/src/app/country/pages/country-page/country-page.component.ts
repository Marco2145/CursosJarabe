import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { of, delay, catchError } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from '../../../shared/components/not-found/not-found.component';
import { CountryInformationComponent } from './country-information/country-information.component';

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryService = inject(CountryService);

  // Con rxResource se trabaja con un observable
  countryResource = rxResource({
    params: () => ({ query: this.countryCode }),
    stream: ({ params }) => {
      if (!params.query) return of();

      delay(500);
      return this.countryService.searchByAlphaCode(params.query).pipe(
        // *Nota: No funciona el mostrar error en la tabla, countryService.error() no da nada
        catchError((error) => {
          console.error(error);
          return of();
        })
      );
    },
  });
}
