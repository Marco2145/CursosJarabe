import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import {
  UserManageResponse,
  User,
  GetUserResponse,
} from '../interfaces/interfaces';
import { Router } from '@angular/router';

const URL = environment.url;
const TOKEN_KEY = 'TOKEN';

//!!! Use only when on android and backend is at localhost
// ! will make you unable to post, but at least can check some functionalities
const BYPASS_LOGIN = false;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _http = inject(HttpClient);
  private _router = inject(Router);
  private _storage: Storage | null = null;

  private _token: string | null = null;
  private _user: User | null = null;

  get token() {
    return this._token + '';
  }

  constructor(private storage: Storage) {
    // ? Se movió al app initializer
    // this.init();
  }

  async init() {
    console.log('storage initialized');

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
    if (!this._storage) await this.init();

    // Load storage
    try {
      const token = await this._storage!.get(TOKEN_KEY);
      this._token = token ?? null;
    } catch (error) {
      console.log(error);
    }
  }

  private _reloadPage() {
    let currentUrl: string = this._router.url;
    this._router.navigateByUrl('/').then(() => {
      this._router.navigate([currentUrl]);
    });
  }

  login(email: string, password: string): Promise<boolean> {
    if (BYPASS_LOGIN) {
      return new Promise((resolve) => {
        resolve(true);
      });
    }

    const data = { email, password };

    return new Promise<boolean>((resolve) => {
      this._http
        .post<UserManageResponse>(`${URL}/user/login`, data)
        .subscribe((resp) => {
          console.log('response', resp);

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

  logout() {
    this._token = null;
    this._user = null;
    this.storage.clear();
    // Redirect
    this._reloadPage();
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

  updateUser(user: User) {
    const headers = new HttpHeaders({
      'x-token': this._token ?? '',
    });

    return new Promise<boolean>((resolve) => {
      this._http
        .post<UserManageResponse>(`${URL}/user/update`, user, { headers })
        .subscribe(async (resp) => {
          if (resp.ok) {
            // console.log({ old: this._token, new: resp.token });

            await this.saveToken(resp.token!);
            await this.validateToken();
            resolve(true);
          } else {
            this._token = null;
            this._storage?.clear();
            resolve(false);
          }
        });
    });
  }

  getUser() {
    // Validate session and redirect if necessary
    if (!this._user?._id) {
      this._reloadPage();
    }

    return { ...this._user };
  }

  async saveToken(token: string) {
    // console.log('Saving token');

    if (!this._storage) throw new Error('Storage not initialized');

    this._token = token;
    await this._storage.set(TOKEN_KEY, token);
  }

  async validateToken(): Promise<boolean> {
    if (BYPASS_LOGIN) {
      return new Promise((resolve) => {
        resolve(true);
      });
    }

    // console.log('token to validate', this._token);

    await this._loadStorage();

    const headers = new HttpHeaders({
      'x-token': this._token ?? '',
    });

    return new Promise<boolean>((resolve) => {
      if (!this._token) {
        resolve(false);
        return;
      }

      this._http
        .get<GetUserResponse>(`${URL}/user/`, { headers })
        .subscribe((resp) => {
          if (resp.ok) {
            this._user = resp.user!;
            // console.log('token decoded as ', resp.user);

            resolve(true);
          } else {
            this._user = null;
            resolve(false);
          }
        });
    });
  }
}
