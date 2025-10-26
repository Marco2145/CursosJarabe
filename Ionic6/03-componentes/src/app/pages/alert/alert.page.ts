import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButton,
  AlertController,
  AlertButton,
  AlertInput,
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, HeaderComponent, IonButton],
})
export class AlertPage implements OnInit {
  private alertController = inject(AlertController);

  // ? NOTA: Se recomienda actualmente usar el inline alert con el <ion-alert></ion-alert> dentro del html

  async presentAlert() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: ['Action'],
      // buttons: alertButtons,
    });

    await alert.present();
  }

  async presentMultiButtonAlert() {
    const alertButtons: AlertButton[] = [
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          console.log('Alert confirmed');
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'rojo',
        handler: () => {
          console.log('Alert canceled');
        },
      },
    ];

    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      // buttons: ['Action'],
      buttons: alertButtons,
    });

    await alert.present();
  }

  async presentAlertPrompt() {
    const alertButtons: AlertButton[] = [
      {
        text: 'OK',
        role: 'confirm',
        handler: (data) => {
          console.log(data);
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'rojo',
        handler: () => {
          console.log('Alert canceled');
        },
      },
    ];

    const alertInputs: AlertInput[] = [
      {
        name: 'name',
        placeholder: 'Name',
      },
      {
        name: 'nickname',
        placeholder: 'Nickname (max 8 characters)',
        attributes: {
          maxlength: 8,
        },
      },
      {
        name: 'age',
        type: 'number',
        placeholder: 'Age',
        min: 1,
        max: 100,
      },
      {
        name: 'bio',
        type: 'textarea',
        placeholder: 'A little about yourself',
      },
    ];

    const alert = await this.alertController.create({
      backdropDismiss: false,
      header: 'Gimme your info pls ',
      // buttons: ['Action'],
      buttons: alertButtons,
      inputs: alertInputs,
    });

    await alert.present();
  }

  constructor() {}

  ngOnInit() {}
}
