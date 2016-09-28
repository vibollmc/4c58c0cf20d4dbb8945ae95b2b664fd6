import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }      from './hotel/dashboard/dashboard.component';
import { RoomtypeComponent }      from './hotel/roomtype/roomtype.component';
import { LoginComponent }      from './hotel/login/login.component';
const appRoutes: Routes = [
  //{
  //  path: 'detail/:id',
  //  component: HeroDetailComponent
  //},
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  //{
  //  path: 'heroes',
  //  component: HeroesComponent
  //},
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'roomtype',
    component: RoomtypeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);