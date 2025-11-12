import { CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

export class ScannedRegister {
  public format: CapacitorBarcodeScannerTypeHint;
  public text: string;
  public type: string;
  public icon: string;
  public created: Date;

  constructor(format: CapacitorBarcodeScannerTypeHint, text: string) {
    this.format = format;
    this.text = text;

    this.type = '';
    this.icon = '';
    this._determineType();

    this.created = new Date();
  }

  private _determineType() {
    const textStart = this.text.substring(0, 4);

    switch (textStart) {
      case 'http':
        this.type = 'http';
        this.icon = 'globe';
        break;
      case 'geo:':
        this.type = 'location';
        this.icon = 'pin';
        break;
      default:
        this.type = 'unrecognized';
        this.icon = 'create';
        break;
    }
  }
}
