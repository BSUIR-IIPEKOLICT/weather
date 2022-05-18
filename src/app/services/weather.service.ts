import { Injectable } from '@angular/core';
import { WeatherRepository } from '../../repositories/weather.repository';
import { Observable, Subject } from 'rxjs';
import { Weather } from '../abstractions/models';
import { switchMap } from 'rxjs/operators';
import { Units } from '../constants/enums';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private weather: Subject<Weather> = new Subject<Weather>();
  private city: Subject<string> = new Subject<string>();
  private units: Units = Units.METRIC;

  constructor(private readonly weatherRepository: WeatherRepository) {
    this.city
      .pipe(
        switchMap((city: string) => this.weatherRepository.getWeather(city, this.units))
      )
      .subscribe((weather: Weather) => {
        this.weather.next(weather);
        console.log(weather);
      });
  }

  getWeather(): Observable<Weather> {
    return this.weather.asObservable();
  }

  setCity(city: string) {
    this.city.next(city);
  }

  setUnits(units: Units) {
    this.units = units;
  }
}
