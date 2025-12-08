import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import {
  UserManageResponse,
  User,
  GetUserResponse,
} from '../interfaces/interfaces';

const URL = environment.url;
const TOKEN_KEY = 'TOKEN';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _http = inject(HttpClient);
  private _storage: Storage | null = null;

  private _token: string | null = null;
  private _user: User | null = null;

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
    if (!this._storage) await this._init();

    // Load storage
    try {
      const token = await this._storage!.get(TOKEN_KEY);
      this._token = token ?? null;
    } catch (error) {
      console.log(error);
    }
  }

  login(email: string, password: string): Promise<boolean> {
    const data = { email, password };

    return new Promise<boolean>((resolve) => {
      this._http
        .post<UserManageResponse>(`${URL}/user/login`, data)
        .subscribe((resp) => {
          console.log(resp);

          if (resp.ok) {
            this.saveToken(resp.token!);
            resolve(true);
          } else {
            this._token = null;
            this._storage?.clear();
            resolve(false);
          }
        });
    });
  }

  register(user: User): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this._http
        .post<UserManageResponse>(`${URL}/user/create`, user)
        .subscribe((resp) => {
          if (resp.ok) {
            this.saveToken(resp.token!);
            resolve(true);
          } else {
            this._token = null;
            this._storage?.clear();
            resolve(false);
          }
        });
    });
  }

  async saveToken(token: string) {
    if (!this._storage) throw new Error('Storage not initialized');

    this._token = token;
    await this._storage.set(TOKEN_KEY, token);
  }

  async validateToken(): Promise<boolean> {
    await this._loadStorage();

    const headers = new HttpHeaders({
      'x-token': this._token ?? '',
    });

    return new Promise<boolean>((resolve) => {
      if (!this._token) resolve(false);

      this._http
        .get<GetUserResponse>(`${URL}/user/`, { headers })
        .subscribe((resp) => {
          if (resp.ok) {
            this._user = resp.user!;
            resolve(true);
          } else {
            this._user = null;
            resolve(false);
          }
        });
    });
  }
}
