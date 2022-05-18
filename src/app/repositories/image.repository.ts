import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ImageParams } from '../abstractions/models';
import { Observable } from 'rxjs';
import { UNSPLASH_API_URL, UNSPLASH_CLIENT_ID } from '../constants/common';

@Injectable({ providedIn: 'root' })
export class ImageRepository {
  constructor(private readonly httpClient: HttpClient) {}

  getImageParams(city: string): Observable<ImageParams> {
    return this.httpClient.get<ImageParams>(`${UNSPLASH_API_URL}/photos/random`, {
      params: new HttpParams({
        fromObject: {
          client_id: UNSPLASH_CLIENT_ID,
          orientation: 'portrait',
          query: city,
          size: 'small',
        },
      }),
    });
  }
}
