import {Component, OnInit} from "@angular/core";

import { RoomtypeModel } from "./roomtype.model";
import { Roomtype } from "../models/roomtype";

declare var $: any;


@Component({
    selector: 'roomtype',
    templateUrl: 'app/hotel/roomtype/roomtype.html'
})

export class RoomtypeComponent implements OnInit {
    modalTitle: string;
    modalTextSave: string;
    constructor(
        public vm : RoomtypeModel
    ) { }

    ngOnInit(): void {
        this.vm.loadData();
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
}