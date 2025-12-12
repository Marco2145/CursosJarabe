import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer',
})
export class DomSanitizerPipe implements PipeTransform {
  private _domSanitizer = inject(DomSanitizer);

  transform(img: string): unknown {
    const domImg = `background-image: url('${img}')`;

    return this._domSanitizer.bypassSecurityTrustStyle(domImg);
  }
}
