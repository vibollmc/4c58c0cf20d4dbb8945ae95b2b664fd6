import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { ListModel } from "../shared/list.model";
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
        public vm: ListModel<Roomtype>,
        protected router: Router
    ) {
        super(router);
     }

    ngOnInit() {
        super.ngOnInit();
        this.vm.obj = new Roomtype();
        this.vm.loadData();
    }

    public selectRoomtype(roomtype: Roomtype) {
        if (roomtype != undefined && roomtype !== null) {
            this.modalTitle = "Thông tin loại phòng";
            this.modalTextSave = " Cập nhật";
            this.vm.obj = roomtype;
            this.vm.obj.updatedBy = this.UserLogin._id;
        }
        else {
            this.vm.obj = new Roomtype();
            this.vm.obj.createdBy = this.UserLogin._id;
            this.modalTitle = "Thêm mới loại phòng";
            this.modalTextSave = " Tạo mới";
        }
    }

    public saveRoomtype() {
        this.vm.save();
        $("#roomtypemodal").modal('hide');
    }

    public deleteRoomtype(roomtype: Roomtype) {
        this.vm.obj = roomtype;
        this.vm.delete();
    }

    public updateStatus(id: string, active: boolean) {
        this.vm.updateStatus(id, active);
    }
}