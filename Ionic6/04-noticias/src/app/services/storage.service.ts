import { computed, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/news.interface';

const DB_ARTICLES_KEY = 'articles';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  private ready = computed<boolean>(() => {
    return !typeof this._localArticles == undefined;
  });

  get localArticles(): Article[] {
    return [...this._localArticles];
  }

  constructor(private storage: Storage) {
    if (!this.ready()) this._init();
  }

  private async _init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;

    await this._loadFavorites();
  }

  private async _loadFavorites() {
    try {
      const articles = await this._storage!.get(DB_ARTICLES_KEY);
      this._localArticles = articles ?? [];
    } catch (error) {
      console.log(error);
    }

    // console.log('loaded', this._localArticles);
  }

  async saveRemoveArticle(article: Article) {
    const articleExists = this._localArticles.find(
      (localArticle) => localArticle.title === article.title
    );
    console.log(articleExists);

    if (articleExists) {
      this._localArticles = this._localArticles.filter(
        (localArticle) => localArticle.title !== article.title
      );
    } else {
      this._localArticles = [article, ...this._localArticles];
    }

    await this._storage!.set(DB_ARTICLES_KEY, this._localArticles);
  }

  async articleInFavorites(article: Article) {
    if (!this.ready()) await this._init();

    return !!this._localArticles.find(
      (localArticle) => localArticle.title == article.title
    );
  }
}
