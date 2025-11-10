import { Component, inject } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonButtons,
  IonIcon,
  IonLabel,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { ScannedRegister } from 'src/app/models/scannedRegister.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    DatePipe,
  ],
})
export class Tab2Page {
  protected dataLocalService = inject(DataLocalService);

  sendMail() {
    console.log('Sending email...');
  }

  openRegister(register: ScannedRegister) {
    console.log('Opened', register);
  }
}
