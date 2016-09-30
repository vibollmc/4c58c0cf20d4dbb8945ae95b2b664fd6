import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { RoomtypeModel } from "./roomtype.model";
import { Roomtype } from "../models/roomtype";
import { BaseComponent } from "../shared/base.component";

declare var $: any;


@Component({
    selector: 'roomtype',
    templateUrl: 'app/hotel/roomtype/roomtype.html'
})

export class RoomtypeComponent extends BaseComponent {
    modalTitle: string;
    modalTextSave: string;
    constructor(
        public vm: RoomtypeModel,
        protected router: Router
    ) {
        super(router);
     }

    ngOnInit() {
        super.ngOnInit();
        this.vm.loadData();
    }

    public selectRoomtype(roomtype: Roomtype) {
        if (roomtype != undefined && roomtype !== null) {
            this.modalTitle = "Thông tin loại phòng";
            this.modalTextSave = " Cập nhật";
            this.vm.roomtype = roomtype;
            this.vm.roomtype.updatedBy = this.UserLogin._id;
        }
        else {
            this.vm.roomtype = new Roomtype();
            this.vm.roomtype.createdBy = this.UserLogin._id;
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

    public updateStatus(id: string, active: boolean) {
        this.vm.updateStatus(id, active);
    }
}