import { Component, inject, input, OnInit } from '@angular/core';
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
  ActionSheetController,
  ActionSheetButton,
  ToastController,
} from '@ionic/angular/standalone';
import { InAppBrowser } from '@capacitor/inappbrowser';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { Clipboard } from '@capacitor/clipboard';

import { StorageService } from '../../../services/storage.service';

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
export class ArticleComponent implements OnInit {
  index = input.required<number>({ alias: 'articleIndex' });
  article = input.required<Article>({ alias: 'articleInput' });

  actionSheetCtrl = inject(ActionSheetController);
  toastCtrl = inject(ToastController);
  storageService = inject(StorageService);

  favoriteButton: ActionSheetButton = {
    text: 'Favorite',
    icon: 'heart-outline',
    handler: () => this.onToggleFavorite(),
  };

  unfavoriteButton: ActionSheetButton = {
    text: 'Remove from favorites',
    icon: 'heart-dislike-outline',
    handler: () => this.onToggleFavorite(),
  };

  actionSheetButtons: ActionSheetButton[] = [];

  async ngOnInit() {
    let articleInFavorites = await this.storageService.articleInFavorites(
      this.article()
    );

    this.actionSheetButtons = [
      {
        text: 'Share',
        icon: 'share-outline',
        handler: () => this.onShareArticle(),
      },
      articleInFavorites ? this.unfavoriteButton : this.favoriteButton,
      {
        text: 'Cancel',
        icon: 'close-outline',
        role: 'cancel',
      },
    ];
  }

  async openArticle() {
    if (Capacitor.isNativePlatform()) {
      await InAppBrowser.openInExternalBrowser({
        url: this.article().url,
      });
    } else {
      window.open(this.article().url, '_blank');
    }
  }

  async onOpenMenu() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: this.actionSheetButtons,
    });

    await actionSheet.present();
  }

  async onShareArticle(): Promise<boolean | void> {
    if (Capacitor.isNativePlatform()) {
      await Share.share({
        title: 'Share article',
        text: 'Check out this article!',
        url: this.article().url,
        dialogTitle: 'Share with your friends',
      });
      return true;
    }

    const writeToClipboard = async () => {
      await Clipboard.write({
        string: this.article().url,
      });
      const toast = await this.toastCtrl.create({
        message: 'Copied to clipboard!',
        duration: 1500,
        position: 'bottom',
        buttons: [{ text: 'Dismiss', role: 'cancel' }],
      });
      await toast.present();
    };
    await writeToClipboard();

    return true;
  }

  onToggleFavorite(): boolean | void | Promise<boolean | void> {
    this.storageService.saveRemoveArticle(this.article());

    this.toggleFavButton();
  }

  toggleFavButton() {
    if (this.actionSheetButtons[1] == this.favoriteButton) {
      this.actionSheetButtons[1] = this.unfavoriteButton;
      return;
    }
    this.actionSheetButtons[1] = this.favoriteButton;
  }
}
