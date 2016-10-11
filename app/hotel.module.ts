import { NgModule } from "@angular/core";
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MaterialModule } from '@angular/material';

import { routing } from './app.routing';
import { HotelComponent } from "./hotel.component";
import { DashboardComponent } from "./hotel/dashboard/dashboard.component";
import { RoomtypeComponent } from "./hotel/roomtype/roomtype.component";
import { ListModel } from "./hotel/shared/list.model";

import { LoginComponent } from "./hotel/login/login.component";
import { LoginService } from "./hotel/login/login.service";
import { LoginModel } from "./hotel/login/login.model";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        routing
    ],
    declarations: [
        HotelComponent,
        DashboardComponent,
        RoomtypeComponent,
        LoginComponent,
    ],
    providers: [
        ListModel,
        LoginModel,
        LoginService
    ],
    bootstrap: [HotelComponent]
})

export class HotelModule {
}