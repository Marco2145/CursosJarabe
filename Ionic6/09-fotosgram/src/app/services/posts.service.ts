import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { Capacitor } from '@capacitor/core';
import { FileTransfer } from '@capacitor/file-transfer';
import { Filesystem, Directory } from '@capacitor/filesystem';

import {
  PostsDB,
  GetPostsResponse,
  PostMyPostResponse,
} from '../interfaces/interfaces';

import { UserService } from './user.service';

import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private _http = inject(HttpClient);
  private _userService = inject(UserService);

  postsPage = 0;
  private _mostRecentPost = signal<PostsDB | null>(null);
  public mostRecentPost = computed(() => this._mostRecentPost());

  getPosts(reset: boolean = false) {
    if (reset) this.postsPage = 0;

    this.postsPage++;
    return this._http.get<GetPostsResponse>(
      `${URL}/posts/?page=${this.postsPage}`
    );
  }

  createPost(post: PostsDB) {
    const headers = new HttpHeaders({
      'x-token': this._userService.token,
    });

    return new Promise<boolean>((resolve) => {
      this._http
        .post<PostMyPostResponse>(`${URL}/posts`, post, { headers })
        .subscribe((resp) => {
          console.log(resp);
          if (resp.ok) {
            this._mostRecentPost.set(resp.post!);
            resolve(true);
          } else {
            resolve(false);
          }
        });
    });
  }

  async uploadImage(imgUri: string, blob?: Blob): Promise<boolean> {
    if (Capacitor.isNativePlatform()) {
      // Si es en android
      return new Promise<boolean>(async (resolve) => {
        try {
          // Use the FileTransfer plugin to upload
          const result = await FileTransfer.uploadFile({
            url: `${URL}/posts/upload`,
            fileKey: 'image',
            path: imgUri,
            // chunkedMode: true,
            headers: {
              'x-token': this._userService.token,

              // Upload uses `multipart/form-data` by default.
              // If you want to avoid that, you can set the 'Content-Type' header explicitly.
              // 'Content-Type': 'application/octet-stream',
            },
            progress: false,
          });
          // get server response and other info from result - see `UploadFileResult` interface
          console.log(result);
          resolve(true);
        } catch (error) {
          // handle error - see `FileTransferError` interface for what error information is returned
          console.log('error: ', error);
          resolve(false);
        }
      });
    } else {
      // Si es en web
      if (blob) {
        // Verificar que sea blob, y retornar la promesa
        return new Promise<boolean>(async (resolve) => {
          try {
            // Use the FileTransfer plugin to upload
            const result = await FileTransfer.uploadFile({
              url: `${URL}/posts/upload`,
              fileKey: 'image',
              path: imgUri,
              blob: blob,
              // chunkedMode: true,
              headers: {
                'x-token': this._userService.token,

                // Upload uses `multipart/form-data` by default.
                // If you want to avoid that, you can set the 'Content-Type' header explicitly.
                // 'Content-Type': 'application/octet-stream',
              },
              progress: false,
            });
            // get server response and other info from result - see `UploadFileResult` interface
            console.log(result);
            resolve(true);
          } catch (error) {
            // handle error - see `FileTransferError` interface for what error information is returned
            console.log('error: ', error);
            resolve(false);
          }
        });
      } else {
        return Promise.resolve(false);
      }
    }
  }
}
