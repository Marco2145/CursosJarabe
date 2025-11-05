import { Component, input } from '@angular/core';
import { Article } from '../../../interfaces/news.interface';
import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-article',
  imports: [IonCardContent, IonImg, IonCardTitle, IonCardSubtitle, IonCard],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  index = input.required<number>({ alias: 'articleIndex' });
  article = input.required<Article>({ alias: 'articleInput' });
}
