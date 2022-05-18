import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Weather } from '../abstractions/models';
import { Subscription } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { WEATHER_API_URL } from '../constants/common';
import { StorageService } from '../services/storage.service';
import { TempUnits, Units } from '../constants/enums';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit, OnDestroy {
  weather: Weather | undefined;
  description = '';
  iconUrls: string[] = [];
  subscription: Subscription = new Subscription();
  form: FormGroup | undefined;
  tempUnits = TempUnits.CELSIUS;

  constructor(
    private readonly weatherService: WeatherService,
    private readonly storageService: StorageService
  ) {}

  get cityControl(): AbstractControl | null {
    return this.form?.get('city') || null;
  }

  async ngOnInit() {
    this.subscription = this.weatherService
      .getWeather()
      .subscribe((newValue: Weather) => {
        this.weather = newValue;
        this.description = '';
        this.iconUrls = [];

        this.weather.weather.forEach(({ description, icon }) => {
          this.description += this.description ? `, ${description}` : description;
          this.iconUrls.push(`${WEATHER_API_URL}/img/w/${icon}.png`);
        });
      });

    this.form = new FormGroup({
      city: new FormControl('', [Validators.required, Validators.nullValidator]),
    });

    const savedCity: string | null | undefined = await this.storageService.get('city');
    const savedUnits: Units | null | undefined = await this.storageService.get('units');

    switch (savedUnits) {
      case Units.IMPERIAL:
        this.tempUnits = TempUnits.FAHRENHEIT;
        break;
      case Units.STANDARD:
        this.tempUnits = TempUnits.KELVIN;
        break;
      default:
        break;
    }

    this.weatherService.setUnits(savedUnits || Units.METRIC);
    this.weatherService.setCity(savedCity || 'Minsk');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async onChangeCity(): Promise<void> {
    if (this.cityControl && this.cityControl.value) {
      this.weatherService.setCity(this.cityControl.value);
      await this.storageService.set('city', this.cityControl.value);
      this.cityControl.setValue('');
    }
  }
}
