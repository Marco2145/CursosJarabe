import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonLabel,
  IonDatetimeButton,
  IonModal,
  IonDatetime,
  IonButton,
  ToastController,
} from '@ionic/angular/standalone';
import moment from 'moment-timezone';
import { INotification } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonButton,
    IonDatetime,
    IonModal,
    IonDatetimeButton,
    IonLabel,
    IonTextarea,
    IonInput,
    IonItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    FormsModule,
  ],
})
export class HomePage {
  // Información de ejemplo, se puede cambiiar
  public notification: INotification = {
    title: '',
    body: '',
    date: moment().format('YYYY-MM-DDTHH:mm:ss'),
    url: 'https://google.com.mx',
  };

  private notificationService = inject(NotificationService);
  private toastController = inject(ToastController);

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });

    toast.present();
  }

  sendNotification() {
    console.log(this.notification);
    this.notificationService
      .sendNotification(this.notification)
      .then(async (responseStatus: boolean) => {
        if (responseStatus) {
          await this.presentToast('Notificación enviada exitosamente');
        } else {
          await this.presentToast('Envío de notificación falló');
        }
      })
      .catch(async (err) => {
        await this.presentToast(`Error inesperado:  ${err}`);
      });
  }
}
