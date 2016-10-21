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
        this.vm.setCollection("Roomtype");
        this.vm.obj = new Roomtype();
        this.vm.loadData();
    }

    public select(obj: Roomtype) {
        if (obj != undefined && obj !== null) {
            this.modalTitle = "Thông tin loại phòng";
            this.modalTextSave = " Cập nhật";
            this.vm.obj = obj;
        }
        else {
            this.vm.obj = new Roomtype();
            this.modalTitle = "Thêm mới loại phòng";
            this.modalTextSave = " Tạo mới";
        }
    }

    public save() {
        this.vm.save();
        $("#editmodal").modal('hide');
    }

    public delete(obj: Roomtype) {
        this.vm.obj = obj;
        this.vm.delete();
    }

    public updateStatus(id: string, active: boolean) {
        this.vm.updateStatus(id, active);
    }
}