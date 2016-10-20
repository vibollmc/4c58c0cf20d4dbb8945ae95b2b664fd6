import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './hotel/dashboard/dashboard.component';
import { RoomtypeComponent } from './hotel/roomtype/roomtype.component';
import { LoginComponent } from './hotel/login/login.component';
import { AccountComponent } from './hotel/account/account.component';
import { SettingComponent } from './hotel/setting/setting.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
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
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'setting',
    component: SettingComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);