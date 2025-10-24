import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { tap } from 'rxjs';
import { ProductCarouselComponent } from '@store-front/components/product-carousel/product-carousel.component';

@Component({
  selector: 'app-product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  // ? Este es dinámico, pero en la clase se propuso uno estático, así que se cambió
  // productIdSlug = signal('');
  // constructor() {
  //   this.activatedRoute.params.subscribe((params) => {
  //     this.productIdSlug.set(params['idSlug']);
  //   });
  // }

  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    params: () => ({ id: this.productIdSlug }),
    stream: ({ params }) => {
      return this.productsService.getProductByIdSlug(params.id);
    },
  });
}
