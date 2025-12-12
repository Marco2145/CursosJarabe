import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Pipe({
  name: 'postImage',
})
export class PostImagePipe implements PipeTransform {
  transform(image: string, userId: string): string {
    return `${URL}/posts/image/${userId}/${image}`;
  }
}
