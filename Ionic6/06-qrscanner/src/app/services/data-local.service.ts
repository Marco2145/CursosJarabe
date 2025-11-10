import { Injectable } from '@angular/core';
import { ScannedRegister } from '../models/scannedRegister.model';
import { CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

@Injectable({ providedIn: 'root' })
export class DataLocalService {
  private _savedRegisters: ScannedRegister[] = [];

  get savedRegisters() {
    return [...this._savedRegisters];
  }

  saveRegister(format: CapacitorBarcodeScannerTypeHint, text: string) {
    const myRegister = new ScannedRegister(format, text);
    this._savedRegisters.unshift(myRegister);
  }
}
