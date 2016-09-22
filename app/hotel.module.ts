import { NgModule } from "@angular/core";
import { BrowserModule }  from '@angular/platform-browser';

import { routing } from './app.routing';

import { HotelComponent } from "./hotel.component";
import { DashboardComponent } from "./hotel/dashboard/dashboard.component";
import { RoomtypeComponent } from "./hotel/roomtype/roomtype.component";

@NgModule({
    imports: [
        BrowserModule,
        routing
    ],
    declarations: [
        HotelComponent,
        DashboardComponent,
        RoomtypeComponent
    ],
    bootstrap: [HotelComponent]
})

export class HotelModule {
}