import { NgModule } from "@angular/core";
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { MaterialModule } from '@angular/material';
import { ColorPickerModule } from 'angular2-color-picker';
import { 
    CalendarModule, 
    DropdownModule, 
    InputTextModule, 
    InputTextareaModule, 
    ScheduleModule,
    AutoCompleteModule,
    ButtonModule,
    StepsModule,
    MenuItem,
    CheckboxModule
} from 'primeng/primeng';

import { routing } from './app.routing';
import { HttpClient } from './hotel/shared/http.client';
import { ListModel } from "./hotel/shared/list.model";
import { ListService } from "./hotel/shared/list.service";
import { ShareModel } from "./hotel/shared/share.model";
import { ShareService } from "./hotel/shared/share.service";

import { HotelComponent } from "./hotel.component";
import { DashboardComponent } from "./hotel/dashboard/dashboard.component";
import { RoomtypeComponent } from "./hotel/roomtype/roomtype.component";
import { LoginComponent } from "./hotel/login/login.component";
import { AccountComponent } from "./hotel/account/account.component";
import { SettingComponent } from "./hotel/setting/setting.component";
import { OtherServiceComponent } from './hotel/otherservice/otherservice.component';
import { CustomerComponent } from './hotel/customer/customer.component';
import { RoomComponent } from './hotel/room/room.component';
import { BookingComponent } from './hotel/booking/booking.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule,
        ColorPickerModule,
        CalendarModule,
        DropdownModule,
        InputTextModule,
        InputTextareaModule,
        ScheduleModule,
        AutoCompleteModule,
        ButtonModule,
        StepsModule,
        CheckboxModule,
        routing
    ],
    declarations: [
        HotelComponent,
        DashboardComponent,
        RoomtypeComponent,
        LoginComponent,
        AccountComponent,
        SettingComponent,
        OtherServiceComponent,
        CustomerComponent,
        RoomComponent,
        BookingComponent
    ],
    providers: [
        ListModel,
        ListService,
        HttpClient,
        ShareModel,
        ShareService
    ],
    bootstrap: [HotelComponent]
})

export class HotelModule {
}