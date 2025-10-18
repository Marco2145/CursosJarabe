import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const BASE_URL = environment.baseUrl;
const DEF_URL = './assets/images/no-image.jpg';

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): string {
    if (typeof value === 'string') return this.createUrl(value);

    if (value.length > 0) return this.createUrl(value[0]);

    return DEF_URL;
  }

  createUrl(param: string): string {
    return `${BASE_URL}/files/product/${param}`;
  }
}
