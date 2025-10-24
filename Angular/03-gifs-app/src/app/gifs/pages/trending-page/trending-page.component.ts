import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  OnDestroy,
  signal,
  viewChild,
} from '@angular/core';
// import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll($event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    // Espacio entre el top del viewPort y del top del Scroll (Cuanto se ha movido en px)
    const scrollTop = scrollDiv.scrollTop;
    this.scrollStateService.trendingScrollOffset.set(scrollTop);
    // Tamaño del ViewPort
    const clientHeight = scrollDiv.clientHeight;
    // Tamaño total del Scroll, incluyendo lo que no es visible
    const scrollHeight = scrollDiv.scrollHeight;

    // console.log({ scrollTop, clientHeight, scrollHeight });

    // Se dan 300px extra de gracia, para que no llegue al final
    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight;

    if (isAtBottom) {
      this.gifService.loadNextTrendingGifsPage();
    }
  }

  // // Esto no funcionó, se guarda como 0 el valor
  // ngOnDestroy(): void {
  //   const scrollDiv = this.scrollDivRef()?.nativeElement;
  //   if (!scrollDiv) return;

  //   const scrollTop = scrollDiv.scrollTop;
  //   this.scrollStateService.trendingScrollOffset.set(scrollTop);
  // }

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollOffset();
  }
}
