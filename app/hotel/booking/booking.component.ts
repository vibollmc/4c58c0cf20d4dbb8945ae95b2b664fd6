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
import { RoomInfo } from '../models/metadata/room.info';
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
        }`,`
        .fc-day-grid-event .fc-content {
            white-space: normal;
        }`],
    encapsulation: ViewEncapsulation.None
})

export class BookingComponent extends BaseComponent  {
    minBookingDate: Date;
    isAddnewCustomer: boolean;
    modalTitle: string;
    modalTextSave: string;
    today: Date;
    headerConfig: any;
    stepsBooking: MenuItem[];
    stepActiveIndex: number;
    checked: boolean = false;
    lstRoomtype: Roomtype[];
    lstFloor: number[];
    editingBooking: boolean = true;

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
            this.vm.fromDateSelected = new Date(e.view.start);
            this.vm.toDateSelected = new Date(e.view.end);

            this.vm.search(this.vm.fromDateSelected, this.vm.toDateSelected, null);
        }
        else if (this.vm.fromDateSelected > new Date(e.view.start) || this.vm.toDateSelected < new Date(e.view.end)) {
            this.vm.fromDateSelected = new Date(e.view.start);
            this.vm.toDateSelected = new Date(e.view.end);

            this.vm.search(this.vm.fromDateSelected, this.vm.toDateSelected, null);
        }
    }

    public handleEventClick(e) {

        let id = e.calEvent.id;
        let booking = this.vm.lstBooking.find(x=> x._id == id);
        
        this.selectBooking(booking);

        //console.log(this.vm.booking.rooms);

        $("#bookingmodal").modal('show');
    }

    public selectedRoom(room: Room) {
        if (!this.vm.booking.rooms) this.vm.booking.rooms = new Array<RoomInfo>();

        let roombooking = new RoomInfo();
        roombooking._id = room._id;
        roombooking.name = room.name;
        roombooking.roomtype = room.roomtype;
        this.vm.booking.rooms.push(roombooking);
    }

    public removedRoom(id: string) {
        if (this.stepActiveIndex == 3) return;

        let temp = new Array<RoomInfo>();

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

    public getDisableRoom(name: string): boolean {
        if (!this.vm.booking.rooms) return false;
        let room = this.vm.booking.rooms.filter(x=> x.name == name);
        if (!room) return false;

        return room.length > 0;
    }


    public disableNextButton(): boolean {
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

    public addNewCustomer() {
        this.isAddnewCustomer = !this.isAddnewCustomer;
    }
    
    public filterCustomer(event) {
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
    public showDropDownFilter() {
        
        this.filteredCustomer = new Array<CustomerInfo>();

        this.vm.lstCustomerInfo.forEach(customer => {
            this.filteredCustomer.push(customer);
        });
    }
    public selectedCustomer() {
        this.vm.booking.customer = this.customerSelected;
    }
    public selectBooking(obj: Booking) {
        this.isAddnewCustomer = false;
        if (obj) {
            this.modalTitle = "Chi tiết đặt phòng";
            Object.assign(this.vm.booking, obj);
            this.customerSelected = this.vm.booking.customer;
            this.vm.booking.fromDate = new Date(obj.fromDate);
            this.vm.booking.toDate = new Date(obj.toDate);

            this.stepActiveIndex = 3
            this.editingBooking = false;
        }
        else {
            this.editingBooking = true;
            this.stepActiveIndex = 0;
            this.modalTitle = "Đặt phòng";
            this.vm.booking = new Booking();
            this.customerSelected = null;
        }
    }
    public prev() {
        this.stepActiveIndex--;
    }
    public next() {
        this.stepActiveIndex++;
        if (this.stepActiveIndex == 2) {
            this.vm.loadRoomAvalidable();
        }
        
    }
    public save() {
        this.vm.save();
        $("#bookingmodal").modal('hide');
    }
    public edit() {
        this.stepActiveIndex = 0;
        this.editingBooking = true;
    }
    public checkIn() {
        //TODO: Checking from booking here!!!
    }
    public ngOnInit() {
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
    }
}
