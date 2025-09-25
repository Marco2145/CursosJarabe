import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  // Trending gifs signals
  tredingGifs = signal<Gif[]>([]);
  isTrendingGifsLoading = signal(true);

  // Search history
  searchHistory = signal<Record<string, Gif[]>>({});
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

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

  searchGifs(query: string, offset: string): Observable<Gif[]> {
    return (
      this.http
        .get<GiphyResponse>(`${environment.giphyURL}/gifs/search`, {
          params: { api_key: environment.giphyApiKey, q: query, limit: 20, offset: offset },
        })
        //Pipe permite encadenar funcionamientos especiales de los observables
        .pipe(
          // Se pueden concatenar los map
          map(({ data }) => data),
          map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

          // Historial
          tap((items) =>
            this.searchHistory.update((history) => ({ ...history, [query.toLowerCase()]: items }))
          )
        )
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
