import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonProgressBar,
  IonLabel,
  IonItem,
  IonList,
  IonRange,
  RangeChangeEventDetail,
  IonIcon,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonRangeCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.page.html',
  styleUrls: ['./progress.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonRange,
    IonList,
    IonItem,
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonProgressBar,
  ],
})
export class ProgressPage {
  percentage = signal(0.05);

  rangeChange(e: IonRangeCustomEvent<RangeChangeEventDetail>) {
    this.percentage.set((e.detail.value as number) / 100);
    console.log(e);
  }
}
