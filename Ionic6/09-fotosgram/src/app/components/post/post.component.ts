import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  OnInit,
} from '@angular/core';
import { PostsDB } from 'src/app/interfaces/interfaces';
import { IonLabel, IonItem, IonAvatar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonAvatar, IonItem, IonLabel],
})
export class PostComponent implements OnInit {
  post = input.required<PostsDB>();

  ngOnInit() {}
}
