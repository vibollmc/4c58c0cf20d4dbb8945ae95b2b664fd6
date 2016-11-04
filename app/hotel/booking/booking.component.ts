import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import {MenuItem} from 'primeng/primeng';

import { Booking } from '../models/booking';
import { Roomtype } from '../models/roomtype';
import { BookingService } from './booking.service';
import { BookingModel } from './booking.model';
import { ShareModel } from '../shared/share.model';
import { CustomerInfo } from '../models/metadata/customer.info';

import { BaseComponent } from '../shared/base.component';

@Component({
    selector: 'booking',
    providers: [
        BookingModel,
        BookingService
    ],
    templateUrl: 'app/hotel/booking/booking.html',
    styles: [`
        .ui-steps .ui-steps-item {
            width: 25%;
        }`],
    encapsulation: ViewEncapsulation.None
})

export class BookingComponent extends BaseComponent  {
    minBookingDate: Date;
    isAddnewCustomer: boolean;
    modalTitle: string;
    modalTextSave: string;
    today: Date;
    events: any[];
    headerConfig: any;
    stepsBooking: MenuItem[];
    stepActiveIndex: number;
    checked: boolean = false;
    lstRoomtype: Roomtype[];
    lstFloor: number[];

    filteredCustomer: CustomerInfo[];
    customerSelected: CustomerInfo;
    constructor(
        private vm: BookingModel,
        private sm: ShareModel,
        router: Router
    ) {
        super(router);
        this.minBookingDate = new Date();
        this.isAddnewCustomer = false;
        this.today = new Date();
        this.events = new Array<any>();
        this.headerConfig = {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};
    }

    addNewCustomer() {
        this.isAddnewCustomer = !this.isAddnewCustomer;
    }
    
    filterCustomer(event) {
        this.filteredCustomer = new Array<CustomerInfo>();

        this.vm.lstCustomerInfo.forEach(cusInfo => {
            if (cusInfo.name.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredCustomer.push(cusInfo);
            }
            else if (cusInfo.phoneNumber.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filteredCustomer.push(cusInfo);
            }
            else if (cusInfo.name.toLowerCase().indexOf(event.query.toLowerCase()) > 0) {
                this.filteredCustomer.push(cusInfo);
            }
            else if (cusInfo.phoneNumber.toLowerCase().indexOf(event.query.toLowerCase()) > 0) {
                this.filteredCustomer.push(cusInfo);
            }
        });
    }
    showDropDownFilter() {
        
        this.filteredCustomer = new Array<CustomerInfo>();

        this.vm.lstCustomerInfo.forEach(customer => {
            this.filteredCustomer.push(customer);
        });

        console.log(this.filteredCustomer.length);
    }
    selectedCustomer() {
        this.vm.booking.customer = this.customerSelected;
    }
    selectBooking(obj: Booking) {
        if (obj) {
            this.modalTitle = "Đặt phòng";
        }
        else {
            this.modalTitle = "Đặt phòng";
        }
    }
    prev() {
        this.stepActiveIndex--;
    }
    next() {
        this.stepActiveIndex++;
        if (this.stepActiveIndex == 2) {
            //TODO: Load room here
        }
        
    }
    save() {
        //TO DO: Save function here
    }

    ngOnInit() {
        super.ngOnInit();
        this.stepActiveIndex = 0;

        this.sm.getRoomTypeActive((result) => {
            this.lstRoomtype = result;
        });

        this.sm.getSystemSetting("SO_TANG", (result) => {
            this.lstFloor = this.makeArray(result.value);
        });

        this.stepsBooking = [{
                label: 'Khách hàng',
                command: (event: any) => {
                    this.stepActiveIndex = 0;
                    this.modalTextSave = "Tiếp theo"
                }
            },
            {
                label: 'Thời gian',
                command: (event: any) => {
                    this.stepActiveIndex = 1;
                    this.modalTextSave = "Tiếp theo"
                }
            },
            {
                label: 'Chọn phòng',
                command: (event: any) => {
                    this.stepActiveIndex = 2;
                    this.modalTextSave = "Tiếp theo"
                }
            },
            {
                label: 'Xác nhận',
                command: (event: any) => {
                    this.stepActiveIndex = 3;
                    this.modalTextSave = "Xác nhận"
                }
            }
        ];

        this.events = [
            {
                "title": "All Day Event",
                "start": "2016-11-01"
            },
            {
                "title": "Long Event",
                "start": "2016-11-07",
                "end": "2016-11-10"
            },
            {
                "title": "Repeating Event",
                "start": "2016-11-09T16:00:00"
            },
            {
                "title": "Repeating Event",
                "start": "2016-11-16T16:00:00"
            },
            {
                "title": "Conference",
                "start": "2016-11-11",
                "end": "2016-11-13"
            }
        ];
    }
}
