import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductsResponse } from '@products/interfaces/product.interface';
import { Observable, pipe, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;

interface Options {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(options: Options): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    return this.http
      .get<ProductsResponse>(`${BASE_URL}/products`, {
        params: {
          limit: limit,
          offset: offset,
          gender: gender,
        },
      })
      .pipe(tap((resp) => console.log(resp)));
  }
}
