import {
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonCardContent,
  IonInfiniteScrollContent,
  IonInfiniteScroll,
} from '@ionic/angular/standalone';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/app/interfaces/news.interface';
import { ArticlesComponent } from 'src/app/components/articles/articles.component';
import { IonInfiniteScrollCustomEvent } from '@ionic/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ArticlesComponent,
  ],
})
export class Tab1Page {
  selectedCategory = signal('business');

  private fullyLoadedCategories = signal<string[]>([]);
  protected stopLoadingMore = computed(() => {
    if (this.fullyLoadedCategories().includes(this.selectedCategory()))
      return true;
    return false;
  });
  protected loadMore = signal<boolean>(false, {
    equal: (prev, current) => {
      if (prev === true && current === false) {
        // console.log('falling edge');
        //We consider them equal
        return true;
      }

      // console.log('rising edge');
      // We consider it as "changed" so it triggers the rxResource
      return false;
    },
  });

  newsService = inject(NewsService);
  protected newsResource = rxResource({
    params: () => ({
      category: this.selectedCategory(),
      loadMore: this.loadMore(),
    }),
    stream: ({ params }) =>
      this.newsService
        .getTopHeadlinesByCategory(params.category, params.loadMore)
        .pipe(
          tap(() => {
            // console.log(params);
          })
        ),
  });

  // When using the previous parameter, it is necessary to provide the generic type arguments of linkedSignal explicitly.
  // The first generic type corresponds with the type of source and the second generic type determines the output type of computation.
  myArticles = linkedSignal<Article[] | undefined, Article[]>({
    source: this.newsResource.value,
    computation: (source, previous) => {
      return source ?? previous?.value ?? [];
    },
  });

  // myArticles = toSignal<Article[]>(this.newsService.getTopHeadlines());
  // myArticles: Article[] = [];

  loadData(e: IonInfiniteScrollCustomEvent<void>) {
    const currentLengthSnapshot = this.myArticles()!.length;
    this.loadMore.set(true);

    setTimeout(() => {
      if (currentLengthSnapshot === this.myArticles().length) {
        // Si determinamos que no se recibieron más articulos,
        // deshabilitamos el inf loader para esa categoría
        this.fullyLoadedCategories.update((value) => [
          ...value,
          this.selectedCategory(),
        ]);
        // console.log(this.fullyLoadedCategories());
      }
      this.loadMore.set(false);

      e.target.complete();
    }, 1000);
  }
}
