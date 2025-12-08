import { inject, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private _alertController = inject(AlertController);

  async presentInfoAlert(msg: string) {
    const alert = await this._alertController.create({
      message: msg,
      buttons: ['Ok'],
    });

    await alert.present();
  }
}
