import { SlicePipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';

const DEFAULT_IMG_URL =
  'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  // imgUrl = input<string>(DEFAULT_IMG_URL);
  // imgUrl = computed(() => {
  //   if (this.product().images.length == 0) return DEFAULT_IMG_URL;

  //   return `http://localhost:3000/api/files/product/${this.product().images[0]}`;
  // });

  product = input.required<Product>();
}
