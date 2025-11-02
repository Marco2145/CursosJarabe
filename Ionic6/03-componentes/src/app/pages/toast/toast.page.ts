import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  ToastController,
  ToastButton,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.page.html',
  styleUrls: ['./toast.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, CommonModule, FormsModule, HeaderComponent],
})
export class ToastPage implements OnInit {
  toastController = inject(ToastController);

  toastButtons: ToastButton[] = [
    {
      text: 'More Info',
      role: 'info',
      handler: () => {
        console.log('More Info clicked');
      },
    },
    {
      text: 'Dismiss',
      role: 'cancel',
      handler: () => {
        console.log('Dismiss clicked');
      },
    },
  ];

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: 'Hello World!',
      duration: 1500,
      position: 'bottom',
      buttons: this.toastButtons,
    });

    await toast.present();
  }

  constructor() {}

  ngOnInit() {}
}
