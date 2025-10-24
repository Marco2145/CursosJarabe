import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private activatedRoute = inject(ActivatedRoute);

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      // Obtener el valor de la página actual en formato de número
      map((params) => (params.get('page') ? +params.get('page')! : 1)),
      // Protección contra letras o weas random
      map((page) => (isNaN(page) ? 1 : page))
    ),
    { initialValue: 1 }
  );
}
