import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { Weather } from '../abstractions/models';
import { Subscription } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { REFRESH_TIME, OPEN_WEATHER_API_URL } from '../constants/common';

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

  constructor(private readonly weatherService: WeatherService) {}

  get cityControl(): AbstractControl | null {
    return this.form?.get('city') || null;
  }

  ngOnInit() {
    this.subscription = this.weatherService
      .getWeather()
      .subscribe((newValue: Weather) => {
        this.weather = newValue;
        this.description = '';
        this.iconUrls = [];

        this.weather.weather.forEach(({ description, icon }) => {
          this.description += this.description ? `, ${description}` : description;
          this.iconUrls.push(`${OPEN_WEATHER_API_URL}/img/w/${icon}.png`);
        });
      });

    this.form = new FormGroup({
      city: new FormControl('', [Validators.required, Validators.nullValidator]),
    });

    this.weatherService.init();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async onChangeCity(): Promise<void> {
    if (this.cityControl && this.cityControl.value) {
      this.weatherService.setCity(this.cityControl.value);
      this.cityControl.setValue('');
    }
  }

  async refresh(event) {
    await this.onChangeCity();
    setTimeout(() => event.detail.complete(), REFRESH_TIME);
  }
}
