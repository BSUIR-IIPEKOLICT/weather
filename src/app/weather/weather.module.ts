import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WeatherPageRoutingModule } from './weather-routing.module';
import { WeatherPage } from './weather.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WeatherPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [WeatherPage],
})
export class WeatherPageModule {}
