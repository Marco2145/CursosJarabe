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
  IonSegment,
  IonSegmentButton,
  IonLabel,
  SegmentChangeEventDetail,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  IonInfiniteScrollCustomEvent,
  IonSegmentCustomEvent,
} from '@ionic/core';
import { JsonPipe } from '@angular/common';
import { tap } from 'rxjs';

import { NewsService } from 'src/app/services/news.service';
import { ArticlesComponent } from 'src/app/components/articles/articles.component';
import { Article } from 'src/app/interfaces/news.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonLabel,
    IonSegmentButton,
    IonSegment,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ArticlesComponent,
  ],
})
export class Tab2Page {
  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  protected selectedCategory = signal<string>(this.categories[0]);
  private fullyLoadedCategories = signal<string[]>([]);
  // protected stopLoadMore = signal<boolean>(false);
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
  protected disableSegment = signal<boolean>(false);

  private newsService = inject(NewsService);
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

  // ? Methodes

  segmentChanged(e: IonSegmentCustomEvent<SegmentChangeEventDetail>) {
    if (e.detail.value) {
      this.selectedCategory.set(e.detail.value as string);
    } else {
      this.selectedCategory.set(this.categories[0]);
    }
    // console.log(`selected category updated to ${this.selectedCategory()}`);
  }

  loadData(e: IonInfiniteScrollCustomEvent<void>) {
    // prevent user from switching segments while loading more articles
    this.disableSegment.set(true);

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
      this.disableSegment.set(false);
      e.target.complete();
    }, 1000);
  }
}
