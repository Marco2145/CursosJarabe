import { inject, Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { Storage } from '@ionic/storage-angular';
import {
  InAppBrowser,
  DefaultSystemBrowserOptions,
} from '@capacitor/inappbrowser';
import { CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { Capacitor } from '@capacitor/core';
import {
  Filesystem,
  Directory,
  Encoding,
  GetUriResult,
} from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

import { ScannedRegister } from '../models/scannedRegister.model';

const DB_REGISTER_KEY = 'registers';
const FILE_PATH = 'registers.csv';

@Injectable({ providedIn: 'root' })
export class DataLocalService {
  private _storage: Storage | null = null;
  private _savedRegisters: ScannedRegister[] = [];

  private _router = inject(Router);

  constructor(private storage: Storage) {
    this._init();
  }

  private async _init() {
    // Should only be created once
    if (this._storage) {
      return;
    }

    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;

    await this._loadStorage();
  }

  private async _loadStorage() {
    // Load storage
    try {
      const registers = await this._storage!.get(DB_REGISTER_KEY);
      this._savedRegisters = registers ?? [];
    } catch (error) {
      console.log(error);
    }

    // console.log('loaded', this._savedRegisters);
  }

  get savedRegisters() {
    return [...this._savedRegisters];
  }

  async saveRegister(
    format: CapacitorBarcodeScannerTypeHint,
    text: string,
    alsoOpen: boolean = false
  ) {
    const myRegister = new ScannedRegister(format, text);
    // Agregamos al arreglo
    this._savedRegisters.unshift(myRegister);
    // Guardamos el arreglo en el storage
    await this._storage!.set(DB_REGISTER_KEY, this._savedRegisters);

    if (alsoOpen) this.openScannedRegister(myRegister);
  }

  async openScannedRegister(register: ScannedRegister) {
    this._router.navigateByUrl('/tabs/tab2');

    const isNative = Capacitor.isNativePlatform();
    console.log(register);

    switch (register.type) {
      case 'http':
        isNative
          ? await InAppBrowser.openInSystemBrowser({
              url: register.text,
              options: DefaultSystemBrowserOptions,
            })
          : window.open(register.text, '_blank');
        break;
      case 'location':
        this._router.navigateByUrl(`/tabs/tab2/map/${register.text}`);

        break;
    }
  }

  async sendEmail() {
    const titles = 'Type, Format, Created on, Text\n';
    const tempArray = [];

    tempArray.push(titles);

    this._savedRegisters.forEach(({ type, format, created, text }) => {
      const line = `${type}, ${format}, ${created}, ${text.replace(
        ',',
        ';'
      )}\n`;
      tempArray.push(line);
    });

    await this.createLocalFile(tempArray.join(''));

    const uri = await this.getUri(FILE_PATH);

    if (uri)
      await Share.share({
        url: uri,
      });
  }

  async createLocalFile(text: string, path: string = FILE_PATH) {
    try {
      await Filesystem.writeFile({
        path: path,
        data: text,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      console.log('File created');
    } catch (error) {
      console.error(`Could not write file at ${path}`, error);
    }
  }

  async checkFileExists(path: string): Promise<boolean> {
    try {
      await Filesystem.stat({
        path: path,
        directory: Directory.Documents,
      });

      return true;
    } catch (error) {
      console.log(error, `at ${path}`);

      return false;
    }
  }

  async getUri(path: string): Promise<string | void> {
    try {
      const { uri } = await Filesystem.getUri({
        path: path,
        directory: Directory.Documents,
      });
      return uri;
    } catch (error) {
      console.log(error, `at ${path}`);
    }
  }
}
