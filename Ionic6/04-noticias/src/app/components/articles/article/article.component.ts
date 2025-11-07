import { Component, input } from '@angular/core';
import { Article } from '../../../interfaces/news.interface';
import {
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
  IonCardContent,
  IonCol,
  IonRow,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { InAppBrowser } from '@capacitor/inappbrowser';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-article',
  imports: [
    IonIcon,
    IonButton,
    IonRow,
    IonCol,
    IonCardContent,
    IonImg,
    IonCardTitle,
    IonCardSubtitle,
    IonCard,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  index = input.required<number>({ alias: 'articleIndex' });
  article = input.required<Article>({ alias: 'articleInput' });

  async openArticle() {
    if (Capacitor.isNativePlatform()) {
      await InAppBrowser.openInExternalBrowser({
        url: this.article().url,
      });
    } else {
      window.open(this.article().url, '_blank');
    }
  }
  onClick() {
    throw new Error('Method not implemented.');
  }
}
