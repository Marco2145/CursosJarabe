import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonList,
  IonItem,
  IonListHeader,
  IonButton,
  IonDatetime,
  DatetimeChangeEventDetail,
  IonDatetimeButton,
  IonModal,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonDatetimeCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
  standalone: true,
  imports: [
    IonDatetime,
    IonListHeader,
    IonItem,
    IonList,
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonLabel,
  ],
})
export class DateTimePage {
  birthDate = signal<Date>(new Date());

  customPickerOptions = [
    {
      text: 'hola',
      handler: (event: any) => {
        console.log(event);
      },
    },
    {
      text: 'Mundo',
    },
  ];

  onChange($event: IonDatetimeCustomEvent<DatetimeChangeEventDetail>) {
    console.log($event.detail.value);
    console.log(new Date($event.detail.value as string));
  }
}
