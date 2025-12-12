import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  input,
  OnInit,
} from '@angular/core';
import { PostsDB } from 'src/app/interfaces/interfaces';
import { IonLabel, IonItem, IonAvatar } from '@ionic/angular/standalone';
import { DomSanitizerPipe } from 'src/app/pipes/dom-sanitizer-pipe';
import { MapComponent } from '../map/map.component';
import { PostImagePipe } from 'src/app/pipes/post-image-pipe';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonAvatar,
    IonItem,
    IonLabel,
    DomSanitizerPipe,
    MapComponent,
    PostImagePipe,
  ],
})
export class PostComponent implements OnInit {
  img1 = '/assets/perro-1.jpg';
  img2 = '/assets/perro-2.jpg';
  img3 = '/assets/perro-3.jpg';

  post = input.required<PostsDB>();

  ngOnInit() {}
}
