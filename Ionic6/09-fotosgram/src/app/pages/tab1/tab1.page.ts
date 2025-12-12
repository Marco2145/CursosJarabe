import { Component, effect, inject, OnInit, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButtons,
  IonButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/angular/standalone';

import {
  IonInfiniteScrollCustomEvent,
  IonRefresherCustomEvent,
  RefresherEventDetail,
} from '@ionic/core';

import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { PostsDB, GetPostsResponse } from 'src/app/interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { PostsComponent } from 'src/app/components/posts/posts.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonRefresherContent,
    IonRefresher,
    IonInfiniteScrollContent,
    IonInfiniteScroll,

    IonButtons,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PostsComponent,
  ],
})
export class Tab1Page implements OnInit {
  private _postsService = inject(PostsService);
  protected infiniteEnabled = signal<boolean>(true);

  posts: PostsDB[] = [];

  constructor() {
    // Subscribe to most recent (Current)USER post
    toObservable(this._postsService.mostRecentPost)
      .pipe(takeUntilDestroyed())
      .subscribe((value) => {
        if (value && this.posts.length > 0) {
          this.posts.unshift(value);
        }
      });
  }

  ngOnInit(): void {
    this.loadMorePosts(true);
  }

  onIonInfinite(event: IonInfiniteScrollCustomEvent<void>) {
    this.loadMorePosts();
    event.target.complete();
  }

  handleRefresh(event: IonRefresherCustomEvent<RefresherEventDetail>) {
    this.loadMorePosts(true);
    event.target.complete();
  }

  loadMorePosts(reset: boolean = false) {
    if (reset) {
      this.posts = [];
      this.infiniteEnabled.set(true);
    }

    this._postsService.getPosts(reset).subscribe((resp) => {
      console.log(resp);
      this.posts.push(...resp.postsDB);

      if (resp.postsDB.length === 0) this.infiniteEnabled.set(false);
    });
  }
}
