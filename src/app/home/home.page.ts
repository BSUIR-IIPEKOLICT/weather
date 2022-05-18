import { Component, OnDestroy, OnInit } from '@angular/core';
import { EndPoint } from '../constants/enums';
import { RouteButtonProps } from '../abstractions/types';
import { WeatherService } from '../services/weather.service';
import { Subscription } from 'rxjs';
import { ImageParams, Weather } from '../abstractions/models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  imageParams: ImageParams | undefined;
  navButtons: RouteButtonProps[] = [
    {
      title: 'Weather',
      path: EndPoint.WEATHER,
    },
    {
      title: 'Todos',
      path: EndPoint.TODO,
    },
  ];

  private subscription: Subscription = new Subscription();

  constructor(private readonly weatherService: WeatherService) {}

  ngOnInit(): void {
    this.subscription = this.weatherService
      .getImageLink()
      .subscribe((imageParams: ImageParams) => {
        this.imageParams = imageParams;
      });

    this.weatherService.init();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
