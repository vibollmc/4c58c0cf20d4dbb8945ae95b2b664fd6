import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { ListModel } from "../shared/list.model";
import { Room } from "../models/room";
import { Roomtype } from "../models/roomtype";
import { BaseComponent } from "../shared/base.component";
import { ShareModel } from '../shared/share.model';

declare var $: any;
declare var toastr: Toastr;


@Component({
    selector: 'room',
    templateUrl: 'app/hotel/room/room.html'
})

export class RoomComponent extends BaseComponent {
    modalTitle: string;
    modalTextSave: string;
    lstRoomtype: Roomtype[];
    lstFloor: number[];
    inactiveColor: string;
    constructor(
        public vm: ListModel<Room>,
        private sm: ShareModel,
        protected router: Router
    ) {
        super(router);
        this.inactiveColor = "#c6c3c3";
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

        this.sm.getSystemSetting("INACTIVE_COLOR", (result) => {
            this.inactiveColor = result.value ? result.value : "#c6c3c3";
        });

        this.sm.getSystemSetting("SO_TANG", (result) => {
            this.lstFloor = this.makeArray(result.value);
        });
    }
    private getRoomColor(roomtypeId: string): string {
        if (roomtypeId) {
            var data = this.lstRoomtype.filter(x => x._id == roomtypeId);

            if (data && data.length > 0) return data[0].color;
        }

        return this.inactiveColor;
    }

    public selectRoom(floor: number): Room[] {
        if (this.vm.lstObj) 
            return this.vm.lstObj.filter(x=> x.floor == floor)
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

    public select(obj: Room) {
        if (obj != undefined && obj !== null) {
            this.modalTitle = "Thông tin phòng";
            this.modalTextSave = " Cập nhật";
            Object.assign(this.vm.obj, obj);
        }
        else {
            this.vm.obj = new Room();
            this.modalTitle = "Thêm mới phòng";
            this.modalTextSave = " Tạo mới";
        }
    }

    public save() {
        if (this.vm.obj._id) {
            let filterObj = this.vm.lstObj.filter(x=> x._id != this.vm.obj._id && x.name == this.vm.obj.name);
            if (filterObj && filterObj.length > 0) {
                toastr.error("Tên phòng đã tồn tại, vui lòng kiểm tra lại.");
                return;
            }
        } 
        else {
            let filterObj = this.vm.lstObj.filter(x=> x.name == this.vm.obj.name);
            if (filterObj && filterObj.length > 0) {
                toastr.error("Tên phòng đã tồn tại, vui lòng kiểm tra lại.");
                return;
            }
        }
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