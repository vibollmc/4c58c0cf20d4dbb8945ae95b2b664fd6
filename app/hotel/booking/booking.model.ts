import { Injectable } from '@angular/core';

import { BookingService } from './booking.service';
import { Booking } from '../models/booking';
import { Room } from '../models/room';
import { CustomerInfo } from '../models/metadata/customer.info';
import { Customer } from '../models/customer';
import { ResultCode } from '../models/enum';
import { MessageProvider } from "../shared/message";

@Injectable()
export class BookingModel {
    booking: Booking;
    lstBooking: Booking[];
    lstCustomerInfo: CustomerInfo[];
    lstRoomAvalidable: Room[];
    bookingView: Array<any>;
    fromDateSelected: Date;
    toDateSelected: Date;

    constructor(
        private _service: BookingService
    ) {
        this.booking = new Booking();
        this.lstRoomAvalidable = new Array<Room>();
        this.loadCustomer();
        this.bookingView = new Array<any>();
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

    public loadCustomer(): void {
        this._service.getCustomer()
            .then((response) => {

                this.lstCustomerInfo = new Array<CustomerInfo>();

                if (response.code == ResultCode.Success) {
                    this.lstCustomerInfo = this.convertToListCustomerInfo(response.data as Customer[]);
                }
            });
    }

    public loadRoomAvalidable(): void {
        this._service.getRoomAvalidable(this.booking.fromDate, this.booking.toDate)
            .then((response) => {
                if (response.code == ResultCode.Success)
                    this.lstRoomAvalidable = response.data as Room[];
                else
                    this.lstRoomAvalidable = new Array<Room>();
            });
    }

    public save(): void {
        if (this.booking === undefined || this.booking === null) return;

        if (this.booking._id) {
            this._service.update(this.booking).then(
                response => {
                    if (response.data === true) {
                        MessageProvider.saveSuccess();

                        this.search(this.fromDateSelected, this.toDateSelected, null);
                    }
                    else MessageProvider.saveError(response.message);
                }
            );
        }
        else {
            this._service.addNew(this.booking).then(
                response => {
                    if (response.data === true) {
                        MessageProvider.saveSuccess();

                        this.search(this.fromDateSelected, this.toDateSelected, null);
                    }
                    else MessageProvider.saveError(response.message);
                });
        }
    }

    public updateStatus(id: string, active: boolean) {
        if (id === undefined || id === null || id === "") return;

        this._service.updateStatus(id, active);
    }

    public delete() {
        if (!this.booking._id) return;

        MessageProvider.confirmDelete(null,
            (result) => {
                if (result === false) return;

                this._service.delete(this.booking._id).then(
                    response => {
                        if (response.data === true) {
                            MessageProvider.deleteSuccess();
                            //Todo: refesh scheduler
                        }
                        else MessageProvider.deleteError(response.message);
                    }
                );
            });
    }

    public search(fromDate: Date, toDate: Date, searchText: string) {
        this._service.search(fromDate, toDate, searchText)
            .then(response => {
                this.bookingView = new Array<any>();

                if (response.code == ResultCode.Success) {
                    if (response.data) {
                        let booking = response.data as Booking[];
                        booking.forEach(b => {
                            this.bookingView.push({
                                id: b._id,
                                allDay: true,
                                title: b.customer.name + ' - ' + b.customer.phoneNumber, 
                                start: b.fromDate, 
                                end: b.toDate});
                        });
                    }
                }
            });
    }
}