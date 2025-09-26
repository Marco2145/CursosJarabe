import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll($event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    // Espacio entre el la parte de arriba del viewPort y del scroll
    const scrollTop = scrollDiv.scrollTop;
    // Tamaño del viewPort
    const clientHeight = scrollDiv.clientHeight;
    // Tamaño total del elemento, incluyendo lo que no es visible
    const scrollHeight = scrollDiv.scrollHeight;

    // console.log({ scrollTop, clientHeight, scrollHeight });

    // Se dan 300px extra de gracia, para que no llegue al final
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    if (isAtBottom) {
      // TODO: cargar mas gifs
    }
  }
}
