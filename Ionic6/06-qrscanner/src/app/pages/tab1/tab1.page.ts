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
import { DataLocalService } from '../../services/data-local.service';
import { ScannedRegister } from '../../models/scannedRegister.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonButton, IonContent],
})
export class Tab1Page {
  private toastController = inject(ToastController);
  protected dataLocalService = inject(DataLocalService);

  // ionViewWillEnter() {
  //   this.scan();
  // }

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

  async scan() {
    // // ! delete
    // this.testRegister();
    // return;

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

    // Launch Scanner
    const result: CapacitorBarcodeScannerScanResult | void =
      await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL,
      }).catch((err) => {
        console.error(err);
      });

    if (result) {
      this.dataLocalService.saveRegister(
        result!.format,
        result!.ScanResult,
        true
      );
      console.log('Scan successful', result);
    }
  }

  // ! for testing
  testRegister() {
    // this.dataLocalService.saveRegister(
    //   CapacitorBarcodeScannerTypeHint.QR_CODE,
    //   'https://www.google.com',
    //   true
    // );
    this.dataLocalService.saveRegister(
      CapacitorBarcodeScannerTypeHint.QR_CODE,
      'geo:40.73151796986687,-74.06087294062502',
      true
    );
  }
}
