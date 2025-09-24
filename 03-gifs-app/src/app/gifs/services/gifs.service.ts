import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  // Trending gifs signals
  tredingGifs = signal<Gif[]>([]);
  isTrendingGifsLoading = signal(true);

  constructor() {
    this.loadTrendingGifs();
    console.log('Servicio creado');
  }

  loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.giphyURL}/gifs/trending`, {
        params: { api_key: environment.giphyApiKey, limit: 20 },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.tredingGifs.set(gifs);
        this.isTrendingGifsLoading.set(false);
      });
  }

  SearchGifs(query: string, offset: string) {
    return this.http
      .get<GiphyResponse>(`${environment.giphyURL}/gifs/search`, {
        params: { api_key: environment.giphyApiKey, q: query, limit: 20, offset: offset },
      })
      .pipe(
        // Se pueden concatenar los map
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items))

        // TODO: Historial
      );
    //Pipe permite encadenar funcionamientos especiales de los observables
  }
}
