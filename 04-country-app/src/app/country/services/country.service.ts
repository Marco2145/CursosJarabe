import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import type { RESTCountry } from '../interfaces/rest-country-response.interface';
import type { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { map, Observable, catchError, throwError, of, tap, delay } from 'rxjs';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  // Caches
  private queryCacheByCapital = new Map<string, Country[]>();
  private queryCacheByCountry = new Map<string, Country[]>();
  private queryCacheByAlphaCode = new Map<string, Country>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    // console.log(`emitiendo valor ${query}`);
    // return of([]);

    // Revisar cache
    if (this.queryCacheByCapital.has(query)) {
      return of(this.queryCacheByCapital.get(query) ?? []);
    }

    // console.log(`buscando ${query} en servidor`);

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map(CountryMapper.mapRestCountryArrayToCountryArray),
      delay(500),
      tap((countries) => this.queryCacheByCapital.set(query, countries)),
      catchError((error) => {
        // console.log('Error fetching', error);
        return throwError(() => new Error(`${query} by Capital not found`));
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    // Revisar cache
    if (this.queryCacheByCapital.has(query)) {
      return of(this.queryCacheByCapital.get(query) ?? []);
    }

    // console.log(`buscando ${query} en servidor`);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map(CountryMapper.mapRestCountryArrayToCountryArray),
      delay(500),
      tap((countries) => this.queryCacheByCapital.set(query, countries)),
      catchError((error) => {
        // console.log('Error fetching', error);
        return throwError(() => new Error(`${query} by Country not found`));
      })
    );
  }

  searchByAlphaCode(code: string): Observable<Country | undefined> {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map(CountryMapper.mapRestCountryArrayToCountryArray),
      delay(500),
      map((countries) => countries.at(0)),
      tap((countries) => this.queryCacheByAlphaCode.set(code, countries!)),
      catchError((error) => {
        // console.log('Error fetching', error);
        return throwError(() => new Error(`${code} by Alpha Code not found`));
      })
    );
  }
}
