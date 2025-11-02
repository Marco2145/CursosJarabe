import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonRefresher,
  RefresherEventDetail,
  IonRefresherContent,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonRefresherCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-refresher',
  templateUrl: './refresher.page.html',
  styleUrls: ['./refresher.page.scss'],
  standalone: true,
  imports: [
    IonRefresherContent,
    IonRefresher,
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
  ],
})
export class RefresherPage {
  items: any[] = [];

  handleRefresh(e: IonRefresherCustomEvent<RefresherEventDetail>) {
    console.log(e);
    setTimeout(() => {
      this.items = Array(10);
      e.target.complete();
    }, 1500);
  }
}
