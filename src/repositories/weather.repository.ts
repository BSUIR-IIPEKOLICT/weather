import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Weather } from '../app/abstractions/models';
import { Observable } from 'rxjs';
import { OPEN_WEATHER_APP_ID, WEATHER_API_URL } from '../app/constants/common';
import { Units } from '../app/constants/enums';

@Injectable({ providedIn: 'root' })
export class WeatherRepository {
  constructor(private readonly httpClient: HttpClient) {}

  getWeather(city: string, units: Units): Observable<Weather> {
    // let params = new HttpParams();
    //
    // params = params.append('appid', OPEN_WEATHER_APP_ID);
    // params = params.append('lang', 'en');
    // params = params.append('units', units);
    // params = params.append('q', city);
    //
    // console.log(params.keys());

    return this.httpClient.get<Weather>(`${WEATHER_API_URL}/data/2.5/weather`, {
      params: new HttpParams({
        fromObject: {
          appid: OPEN_WEATHER_APP_ID,
          lang: 'en',
          units,
          q: city,
        },
      }),
    });
  }
}
