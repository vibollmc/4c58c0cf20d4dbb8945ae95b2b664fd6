import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { ListModel } from "../shared/list.model";
import { Room } from "../models/room";
import { Roomtype } from "../models/roomtype";
import { BaseComponent } from "../shared/base.component";
import { ShareModel } from '../shared/share.model';

declare var $: any;


@Component({
    selector: 'room',
    templateUrl: 'app/hotel/room/room.html'
})

export class RoomComponent extends BaseComponent {
    modalTitle: string;
    modalTextSave: string;
    lstRoomtype: Roomtype[];
    lstFloor: number[];
    constructor(
        public vm: ListModel<Room>,
        private sm: ShareModel,
        protected router: Router
    ) {
        super(router);
        this.lstRoomtype = new Array<Roomtype>();
        this.lstFloor = new Array<number>();
     }

    ngOnInit() {
        super.ngOnInit();
        this.vm.setCollection("Room");
        this.vm.obj = new Room();
        this.vm.loadData();

        this.sm.getRoomTypeActive((result) => {
            this.lstRoomtype = result;
        });

        this.sm.getSystemSetting("SO_TANG", (result) => {
            this.lstFloor = this.makeArray(result.value);
        });
    }

    public selectRoom(floor: number): Room[] {
        if (this.vm.lstObj) 
            return this.vm.lstObj.filter(x=> x.floor == floor);

        return new Array<Room>();
    }

    public select(obj: Room) {
        if (obj != undefined && obj !== null) {
            this.modalTitle = "Thông tin phòng";
            this.modalTextSave = " Cập nhật";
            this.vm.obj = obj;
        }
        else {
            this.vm.obj = new Room();
            this.modalTitle = "Thêm mới phòng";
            this.modalTextSave = " Tạo mới";
        }
    }

    public save() {
        this.vm.save();
        $("#editmodal").modal('hide');
    }

    public delete(obj: Room) {
        this.vm.obj = obj;
        this.vm.delete();
    }

    public updateStatus(id: string, active: boolean) {
        this.vm.updateStatus(id, active);
    }
}