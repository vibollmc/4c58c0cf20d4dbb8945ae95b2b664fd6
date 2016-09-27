import {Component, OnInit, AfterViewChecked} from "@angular/core";

import { RoomtypeModel } from "./roomtype.model";
import { Roomtype } from "../models/roomtype";

declare var $: any;


@Component({
    selector: 'roomtype',
    templateUrl: 'app/hotel/roomtype/roomtype.html'
})

export class RoomtypeComponent implements OnInit, AfterViewChecked {
    modalTitle: string;
    modalTextSave: string;
    constructor(
        public vm : RoomtypeModel
    ) { }

    ngOnInit() {
        this.vm.loadData();
    }
    
    ngAfterViewChecked() {
        $('input[type=checkbox][data-toggle^=toggle]').bootstrapToggle();
    }
    

    public selectRoomtype(roomtype: Roomtype) {
        if (roomtype != undefined && roomtype !== null) {
            this.modalTitle = "Thông tin loại phòng";
            this.modalTextSave = " Cập nhật";
            this.vm.roomtype = roomtype;
        }
        else { 
            this.vm.roomtype = new Roomtype();
            this.modalTitle = "Thêm mới loại phòng";
            this.modalTextSave = " Tạo mới";
        } 
    }

    public saveRoomtype() {
        this.vm.save();
        $("#roomtypemodal").modal('hide');
    }

    public deleteRoomtype(roomtype: Roomtype) {
        this.vm.roomtype = roomtype;
        this.vm.delete();
    }

    public updateStatus(id: any, status: any) {
        alert("id: " + id + " status: " + status);
    }
}