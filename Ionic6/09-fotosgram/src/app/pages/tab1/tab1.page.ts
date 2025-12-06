import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButtons,
  IonButton,
} from '@ionic/angular/standalone';

import { PostsService } from '../../services/posts.service';
import { PostsDB, PostsResponse } from 'src/app/interfaces/interfaces';
import { PostsComponent } from 'src/app/components/posts/posts.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonButton,
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

  posts: PostsDB[] = [];

  ngOnInit(): void {
    this._postsService.getPosts().subscribe((resp) => {
      console.log(resp);
      this.posts.push(...resp.postsDB);
    });
  }
}
