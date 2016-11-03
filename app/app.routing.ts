import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './hotel/dashboard/dashboard.component';
import { RoomtypeComponent } from './hotel/roomtype/roomtype.component';
import { LoginComponent } from './hotel/login/login.component';
import { AccountComponent } from './hotel/account/account.component';
import { SettingComponent } from './hotel/setting/setting.component';
import { OtherServiceComponent } from './hotel/otherservice/otherservice.component';
import { CustomerComponent } from './hotel/customer/customer.component';
import { RoomComponent } from './hotel/room/room.component';
import { BookingComponent } from './hotel/booking/booking.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'roomtype', component: RoomtypeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'setting', component: SettingComponent },
  { path: 'otherservice', component: OtherServiceComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'room', component: RoomComponent },
  { path: 'booking', component: BookingComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);