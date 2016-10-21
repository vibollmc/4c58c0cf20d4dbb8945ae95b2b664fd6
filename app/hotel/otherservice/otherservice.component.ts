import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { ListModel } from "../shared/list.model";
import { OtherService } from "../models/otherservice";
import { BaseComponent } from "../shared/base.component";

declare var $: any;


@Component({
    selector: 'otherservice',
    templateUrl: 'app/hotel/otherservice/otherservice.html'
})

export class OtherServiceComponent extends BaseComponent {
    modalTitle: string;
    modalTextSave: string;
    constructor(
        public vm: ListModel<OtherService>,
        protected router: Router
    ) {
        super(router);
     }

    ngOnInit() {
        super.ngOnInit();
        this.vm.setCollection("OtherService");
        this.vm.obj = new OtherService();
        this.vm.loadData();
    }

    public select(obj: OtherService) {
        if (obj != undefined && obj !== null) {
            this.modalTitle = "Thông tin dịch vụ";
            this.modalTextSave = " Cập nhật";
            this.vm.obj = obj;
        }
        else {
            this.vm.obj = new OtherService();
            this.modalTitle = "Thêm mới dịch vụ";
            this.modalTextSave = " Tạo mới";
        }
    }

    public save() {
        this.vm.save();
        $("#editmodal").modal('hide');
    }

    public delete(obj: OtherService) {
        this.vm.obj = obj;
        this.vm.delete();
    }

    public updateStatus(id: string, active: boolean) {
        this.vm.updateStatus(id, active);
    }
}