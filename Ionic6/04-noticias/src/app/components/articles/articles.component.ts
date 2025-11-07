import { Component, input, Input } from '@angular/core';
import {
  IonGrid,
  IonRow,
  IonCard,
  IonCol,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonCardContent,
} from '@ionic/angular/standalone';
import { Article } from 'src/app/interfaces/news.interface';
import { ArticleComponent } from './article/article.component';

@Component({
  selector: 'app-articles',
  imports: [IonCol, IonRow, IonGrid, ArticleComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent {
  myArticles = input.required<Article[]>({ alias: 'ArticlesInput' });
}
