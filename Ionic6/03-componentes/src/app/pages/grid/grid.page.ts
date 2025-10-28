import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonCard,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.page.html',
  styleUrls: ['./grid.page.scss'],
  standalone: true,
  imports: [
    IonCardTitle,
    IonCardHeader,
    IonCardSubtitle,
    IonCard,
    IonImg,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,

    CommonModule,
    FormsModule,
    HeaderComponent,
  ],
})
export class GridPage implements OnInit {
  data = Array(12);

  constructor() {}

  ngOnInit() {}
}
