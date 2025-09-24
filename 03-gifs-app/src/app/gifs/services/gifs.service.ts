import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  // Trending gifs signals
  tredingGifs = signal<Gif[]>([]);
  isTrendingGifsLoading = signal(true);

  // Search gifs signals
  searchedGifs = signal<Gif[]>([]);
  isSearchingGifsLoading = signal(false);

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
    this.isSearchingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyURL}/gifs/search`, {
        params: { api_key: environment.giphyApiKey, q: query, limit: 20, offset: offset },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.searchedGifs.set(gifs);
        this.isSearchingGifsLoading.set(false);
      });
  }
}
