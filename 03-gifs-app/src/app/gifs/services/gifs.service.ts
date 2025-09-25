import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

// Llave del local storage para el historial
const GIFS_HISTORY_LOCAL_STORAGE_KEY = 'gifsHistory';

const loadHistoryFromLocalStorage = (): Record<string, Gif[]> => {
  const gifs = localStorage.getItem(GIFS_HISTORY_LOCAL_STORAGE_KEY);

  // TODO: Verificar integridad de la información
  return gifs ? JSON.parse(gifs) : {};
};

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  // Trending gifs signals
  tredingGifs = signal<Gif[]>([]);
  isTrendingGifsLoading = signal(true);

  // Search history
  // searchHistory = signal<Record<string, Gif[]>>({});
  searchHistory = signal<Record<string, Gif[]>>(loadHistoryFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
  saveHistoryToLocalStorage = effect(() => {
    localStorage.setItem(GIFS_HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(this.searchHistory()));
  });

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
