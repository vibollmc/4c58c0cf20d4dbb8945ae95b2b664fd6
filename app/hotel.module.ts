import { NgModule } from "@angular/core";
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { routing } from './app.routing';
import { HotelComponent } from "./hotel.component";
import { DashboardComponent } from "./hotel/dashboard/dashboard.component";
import { RoomtypeComponent } from "./hotel/roomtype/roomtype.component";
import { RoomtypeService } from "./hotel/roomtype/roomtype.service";
import { RoomtypeModel } from "./hotel/roomtype/roomtype.model";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing
    ],
    declarations: [
        HotelComponent,
        DashboardComponent,
        RoomtypeComponent,
    ],
    providers: [
        RoomtypeService,
        RoomtypeModel
    ],
    bootstrap: [HotelComponent]
})

export class HotelModule {
}