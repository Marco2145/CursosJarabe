import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonAvatar,
  IonImg,
  IonChip,
  IonLabel,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.page.html',
  styleUrls: ['./avatar.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonBackButton,
    IonAvatar,
    IonImg,
    IonChip,
    IonLabel,
    IonList,
    IonItem,
  ],
})
export class AvatarPage implements OnInit {
  AVATAR_PATH: string = '/assets/chiitanpfp.png';

  constructor() {}

  ngOnInit() {}
}
