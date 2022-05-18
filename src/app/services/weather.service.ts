import { Injectable } from '@angular/core';
import { WeatherRepository } from '../repositories/weather.repository';
import { Observable, Subject } from 'rxjs';
import { Setting, Weather } from '../abstractions/models';
import { switchMap } from 'rxjs/operators';
import { SettingsRepository } from '../repositories/settings.repository';
import { DEFAULT_CITY } from '../constants/common';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private weather: Subject<Weather> = new Subject<Weather>();
  private city: Subject<string> = new Subject<string>();

  constructor(
    private readonly weatherRepository: WeatherRepository,
    private readonly settingsRepository: SettingsRepository
  ) {
    this.city
      .pipe(switchMap((city: string) => this.weatherRepository.getWeather(city)))
      .subscribe((weather: Weather) => this.weather.next(weather));

    this.weather.subscribe((weather: Weather) => this.saveSettings(weather.name));
  }

  init() {
    this.settingsRepository.getAll().subscribe((settings: Setting[]) => {
      this.city.next(!settings.length ? DEFAULT_CITY : settings[0].city);
    });
  }

  getWeather(): Observable<Weather> {
    return this.weather.asObservable();
  }

  setCity(city: string) {
    this.city.next(city);
  }

  saveSettings(city: string) {
    this.settingsRepository.getAll().subscribe((settings: Setting[]) => {
      if (!settings.length) {
        this.settingsRepository.create({ city });
      } else {
        this.settingsRepository.change({ id: settings[0].id, city });
      }
    });
  }
}
