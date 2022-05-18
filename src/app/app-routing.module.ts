import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EndPoint } from './constants/enums';

const routes: Routes = [
  {
    path: EndPoint.TODO,
    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoPageModule),
  },
  {
    path: EndPoint.WEATHER,
    loadChildren: () =>
      import('./weather/weather.module').then((m) => m.WeatherPageModule),
  },
  {
    path: EndPoint.HOME,
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: EndPoint.HOME,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
