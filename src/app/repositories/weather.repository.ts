import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Weather } from '../abstractions/models';
import { Observable } from 'rxjs';
import { OPEN_WEATHER_APP_ID, OPEN_WEATHER_API_URL } from '../constants/common';

@Injectable({ providedIn: 'root' })
export class WeatherRepository {
  constructor(private readonly httpClient: HttpClient) {}

  getWeather(city: string): Observable<Weather> {
    return this.httpClient.get<Weather>(`${OPEN_WEATHER_API_URL}/data/2.5/weather`, {
      params: new HttpParams({
        fromObject: {
          appid: OPEN_WEATHER_APP_ID,
          lang: 'en',
          units: 'metric',
          q: city,
        },
      }),
    });
  }
}
