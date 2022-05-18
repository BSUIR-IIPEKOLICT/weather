import { Component, OnInit } from '@angular/core';
import { DataService, Message } from '../services/data.service';
import { WeatherService } from '../services/weather.service';
import { EndPoint } from '../constants/enums';
import { RouteButtonProps } from '../abstractions/types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  navButtons: RouteButtonProps[] = [
    {
      title: 'Weather',
      path: `../${EndPoint.WEATHER}`,
    },
    {
      title: 'Todos',
      path: `../${EndPoint.TODO}`,
    },
    {
      title: 'Settings',
      path: `../${EndPoint.SETTINGS}`,
    },
  ];

  constructor(
    private data: DataService,
    private readonly weatherService: WeatherService
  ) {}

  ngOnInit(): void {
    // this.weatherService.setCity('Minsk');
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }

  getMessages(): Message[] {
    return this.data.getMessages();
  }
}
