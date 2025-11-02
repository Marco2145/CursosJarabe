import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-infinite',
  templateUrl: './infinite.page.html',
  styleUrls: ['./infinite.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonItem,
    IonLabel,
    IonList,
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
  ],
})
export class InfinitePage implements OnInit {
  items: string[] = [];

  ngOnInit(): void {
    this.generateItems();
  }

  private generateItems() {
    const count = this.items.length + 1;
    for (let i = 0; i < 20; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    // console.log(event);

    if (this.items.length > 100) {
      setTimeout(() => {
        event.target.complete();
        event.target.disabled = true;
      }, 5000);
      return;
    }

    // ? No sé si deba ir adentro o afuera el generador
    // ? En el video estaba dentro pero en la documentación estaba fuera
    // this.generateItems();
    setTimeout(() => {
      this.generateItems();
      event.target.complete();
    }, 1000);
  }
}
