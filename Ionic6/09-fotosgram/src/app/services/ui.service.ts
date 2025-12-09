import { inject, Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private _alertController = inject(AlertController);
  private _toastController = inject(ToastController);

  async presentInfoAlert(msg: string) {
    const alert = await this._alertController.create({
      message: msg,
      buttons: ['Ok'],
    });

    await alert.present();
  }

  async presentToast(msg: string) {
    const toast = await this._toastController.create({
      message: msg,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }
}
