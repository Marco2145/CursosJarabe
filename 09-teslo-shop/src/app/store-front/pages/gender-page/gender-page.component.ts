import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { ProductsService } from '@products/services/products.service';
import { ProductCardComponent } from '@store-front/components/product-card/product-card.component';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  // ? Esta era la forma que estaba en la documentación de ActivatedRoute, pero en la clase se vió distinto
  // productGender = signal('');
  // constructor() {
  //   this.activatedRoute.params.subscribe((params) => {
  //     this.productGender.set(params['gender']);
  //   });
  // }

  // Esto es en una sola línea y convierte el observable en una señal
  productGender = toSignal(this.activatedRoute.params.pipe(map(({ gender }) => gender)));

  productsResource = rxResource({
    params: () => ({ gender: this.productGender() }),
    stream: ({ params }) => {
      return this.productsService.getProducts({ gender: params.gender });
    },
  });
}
