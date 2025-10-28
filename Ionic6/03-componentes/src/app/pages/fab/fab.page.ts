import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonLabel,
  IonItem,
  IonList,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonCol,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.page.html',
  styleUrls: ['./fab.page.scss'],
  standalone: true,
  imports: [
    IonCol,
    IonFabList,
    IonIcon,
    IonFabButton,
    IonFab,
    IonList,
    IonItem,
    IonLabel,
    IonFooter,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
  ],
})
export class FabPage {
  data = Array(100);
}
