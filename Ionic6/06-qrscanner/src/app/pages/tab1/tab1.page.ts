import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonButton,
  ToastController,
} from '@ionic/angular/standalone';
import {
  CapacitorBarcodeScanner,
  CapacitorBarcodeScannerScanResult,
  CapacitorBarcodeScannerTypeHint,
} from '@capacitor/barcode-scanner';
import { Capacitor } from '@capacitor/core';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonButton, IonContent],
})
export class Tab1Page {
  toastController = inject(ToastController);

  async showToast(toastMsg: string) {
    if (Capacitor.isNativePlatform()) {
      await Toast.show({
        text: toastMsg,
      });
    } else {
      const toast = await this.toastController.create({
        message: toastMsg,
        duration: 1500,
        position: 'bottom',
      });

      await toast.present();
    }
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.scan();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  async scan() {
    // Check permissions if denied
    let permission: PermissionState = 'denied';
    await navigator.permissions
      .query({ name: 'camera' })
      .then((permissionsObj) => {
        // console.log(permissionsObj.state);
        permission = permissionsObj.state;
      })
      .catch((error) => {
        console.error(error);
      });

    if (permission == 'denied') {
      await this.showToast('Please enable the camera permission');
      return;
    }

    const result: CapacitorBarcodeScannerScanResult | void =
      await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
      }).catch((err) => {
        console.log(err);
      });

    console.log(result);
  }
}
