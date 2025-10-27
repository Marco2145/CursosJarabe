import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCardHeader,
  IonCard,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonCardHeader,
    IonCard,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonIcon,
  ],
})
export class CardPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
