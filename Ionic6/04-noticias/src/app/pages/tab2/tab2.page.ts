import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  SegmentChangeEventDetail,
} from '@ionic/angular/standalone';
import { rxResource } from '@angular/core/rxjs-interop';
import { IonSegmentCustomEvent } from '@ionic/core';
import { NewsService } from 'src/app/services/news.service';
import { JsonPipe } from '@angular/common';
import { tap } from 'rxjs';
import { ArticlesComponent } from 'src/app/components/articles/articles.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
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
  public selectedCategory = signal<string>(this.categories[0]);

  private newsService = inject(NewsService);
  protected myResource = rxResource({
    params: () => ({ category: this.selectedCategory() }),
    stream: ({ params }) =>
      this.newsService.getTopHeadlinesByCategory(params.category).pipe(
        tap(() => {
          console.log(params);
        })
      ),
  });

  segmentChanged(e: IonSegmentCustomEvent<SegmentChangeEventDetail>) {
    // console.log(e);

    if (e.detail.value) {
      this.selectedCategory.set(e.detail.value as string);
    } else {
      this.selectedCategory.set(this.categories[0]);
    }
    // console.log(`selected category updated to ${this.selectedCategory()}`);
  }
  constructor() {}
}
