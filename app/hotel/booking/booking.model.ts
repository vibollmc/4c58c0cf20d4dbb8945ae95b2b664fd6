import { Injectable } from '@angular/core';

import { BookingService } from './booking.service';
import { Booking } from '../models/booking';
import { CustomerInfo } from '../models/metadata/customer.info';
import { Customer } from '../models/customer';
import { ResultCode } from '../models/enum';
import { MessageProvider } from "../shared/message";

@Injectable()
export class BookingModel {
    booking: Booking;
    lstBooking: Booking[];
    lstCustomerInfo: CustomerInfo[];

    constructor(
        private _service: BookingService 
    ) {
        this.booking = new Booking();
        this.loadCustomerFiltered();
    }

    private convertToCustomerInfo(customer: Customer): CustomerInfo {
        let customerInfo = new CustomerInfo();
        customerInfo._id = customer._id;
        customerInfo.name = customer.name;
        customerInfo.phoneNumber = customer.phoneNumber;
        customerInfo.email = customer.email;
        customerInfo.representative = customer.representative;
        customerInfo.address = customer.address;
        customerInfo.bankAccount = customer.bankAccount;
        customerInfo.bankName = customer.bankName;
        customerInfo.taxId = customer.taxId;
        customerInfo.idNumber = customer.idNumber;
        customerInfo.description = customer.description;

        return customer;
    }

    private convertToListCustomerInfo(lstCustomer: Customer[]): CustomerInfo[] {
        let listCustomerInfo = new Array<CustomerInfo>();
        if (!lstCustomer) return listCustomerInfo;

        lstCustomer.forEach(customer => {
            listCustomerInfo.push(this.convertToCustomerInfo(customer));
        });

        return listCustomerInfo;
    }

    public loadCustomerFiltered(): void {
        this._service.getCustomer()
            .then((response) => {

                this.lstCustomerInfo = new Array<CustomerInfo>();

                if (response.code == ResultCode.Success) {
                   this.lstCustomerInfo = this.convertToListCustomerInfo(response.data as Customer[]);
                }
            });
    }
}