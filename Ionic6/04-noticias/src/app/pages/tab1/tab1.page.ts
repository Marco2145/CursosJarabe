import { Component, inject } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { toSignal } from '@angular/core/rxjs-interop';

import { NewsService } from 'src/app/services/news.service';
import { Article } from 'src/app/interfaces/news.interface';
import { ArticlesComponent } from 'src/app/components/articles/articles.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ArticlesComponent],
})
export class Tab1Page {
  newsService = inject(NewsService);
  myArticles = toSignal<Article[]>(this.newsService.getTopHeadlines());
  // myArticles: Article[] = [];
}
