import { Injectable } from '@angular/core';

import { BookingService } from './booking.service';
import { Booking } from '../models/booking';
import { CustomerInfo } from '../models/metadata/customer.info';

@Injectable()
export class BookingModel {
    booking: Booking;
    filteredCustomersSingle: CustomerInfo[];
    constructor(
        private _service: BookingService 
    ) {
        this.booking = new Booking();
        this.filteredCustomersSingle = new Array<CustomerInfo>();
    }
}