import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";
import { MenuItem } from 'primeng/primeng';

import { Booking } from '../models/booking';
import { Roomtype } from '../models/roomtype';
import { Room } from "../models/room";
import { BookingService } from './booking.service';
import { BookingModel } from './booking.model';
import { ShareModel } from '../shared/share.model';
import { CustomerInfo } from '../models/metadata/customer.info';
import { RoomBooking } from '../models/metadata/room.booking';
import { BaseComponent } from '../shared/base.component';

declare var $: any;

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
        }`,`
        .ui-autocomplete-list-item div {
            border-bottom: 1px solid #e1e1e1;
            padding-bottom: 8px;
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
    inactiveColor: string;

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

        this.sm.getSystemSetting("INACTIVE_COLOR", (result) => {
            this.inactiveColor = result.value ? result.value : "#c6c3c3";
        });
    }

    private getRoomColor(roomtypeId: string): string {
        if (roomtypeId) {
            let data = this.lstRoomtype.filter(x => x._id == roomtypeId);

            if (data && data.length > 0) return data[0].color;
        }

        return this.inactiveColor;
    }

    public handleViewRender(e) {
        //alert(e.view.name);// + view.start + ' ' + view.end);
        //alert(e.view.start);
        //alert(e.view.end);
        //alert('A');

        if (!this.vm.fromDateSelected || !this.vm.toDateSelected) {
            this.vm.fromDateSelected = e.view.start;
            this.vm.toDateSelected = e.view.end;

            this.vm.search(this.vm.fromDateSelected, this.vm.toDateSelected, null);
        }
        else if (this.vm.fromDateSelected > e.view.start || this.vm.toDateSelected < e.view.start) {
            this.vm.fromDateSelected = e.view.start;
            this.vm.toDateSelected = e.view.end;

            this.vm.search(this.vm.fromDateSelected, this.vm.toDateSelected, null);
        }
    }

    public selectedRoom(id: string, name: string) {
        if (!this.vm.booking.rooms) this.vm.booking.rooms = new Array<RoomBooking>();

        let roombooking = new RoomBooking();
        roombooking._id = id;
        roombooking.name = name;
        this.vm.booking.rooms.push(roombooking);
    }

    public removedRoom(id: string) {
        if (this.stepActiveIndex == 3) return;

        let temp = new Array<RoomBooking>();

        this.vm.booking.rooms.forEach(r => {
            if (r._id != id) {
                temp.push(r);
            }
        });

        this.vm.booking.rooms = temp;
    }

    public roomOfFloor(floor: number): Room[] {
        if (this.vm.lstRoomAvalidable) 
            return this.vm.lstRoomAvalidable.filter(x=> x.floor == floor)
            .sort((a,b) => { 
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            });

        return new Array<Room>();
    }

    public getStyle(roomtypeId: string, active: boolean): any {
        let color = active ? this.getRoomColor(roomtypeId) : this.inactiveColor;
        return {'background-color': color, 'border-color': color};
    }

    public getSelectedRoomStyle(name: string): any {
        let room = this.vm.lstRoomAvalidable.filter(x=> x.name == name)[0];

        return this.getStyle(room.roomtype, room.active);
    }

    public getDisableRoom(name: string): boolean {
        if (!this.vm.booking.rooms) return false;
        let room = this.vm.booking.rooms.filter(x=> x.name == name);
        if (!room) return false;

        return room.length > 0;
    }


    disableNextButton(): boolean {
        if (this.stepActiveIndex == 0) {
            return !this.vm.booking.customer.name || this.vm.booking.customer.name == '';
        }
        else if (this.stepActiveIndex == 1) {
            return !this.vm.booking.fromDate || !this.vm.booking.toDate; 
        }
        else {
            return this.vm.booking.rooms.length == 0;
        }
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
        this.stepActiveIndex = 0;

        if (obj) {
            this.modalTitle = "Đặt phòng";
            Object.assign(this.vm.booking, obj);
            this.customerSelected = this.vm.booking.customer;
        }
        else {
            this.modalTitle = "Đặt phòng";
            this.vm.booking = new Booking();
            this.customerSelected = null;
        }
    }
    prev() {
        this.stepActiveIndex--;
    }
    next() {
        this.stepActiveIndex++;
        if (this.stepActiveIndex == 2) {
            this.vm.loadRoomAvalidable();
        }
        
    }
    save() {
        this.vm.save();
        $("#bookingmodal").modal('hide');
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
                }
            },
            {
                label: 'Thời gian',
                command: (event: any) => {
                    this.stepActiveIndex = 1;
                }
            },
            {
                label: 'Chọn phòng',
                command: (event: any) => {
                    this.stepActiveIndex = 2;
                }
            },
            {
                label: 'Xác nhận',
                command: (event: any) => {
                    this.stepActiveIndex = 3;
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
