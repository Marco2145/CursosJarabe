import { Component, input, OnInit } from '@angular/core';
import { PostsDB } from 'src/app/interfaces/interfaces';
import { PostComponent } from '../post/post.component';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  imports: [IonCol, IonRow, IonGrid, PostComponent],
})
export class PostsComponent implements OnInit {
  posts = input.required<PostsDB[]>();

  ngOnInit() {
    console.log(this.posts());
  }
}
