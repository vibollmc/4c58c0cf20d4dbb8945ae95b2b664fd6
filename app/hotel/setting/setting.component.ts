import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { ListModel } from "../shared/list.model";
import { SystemSetting } from "../models/systemsetting";
import { BaseComponent } from "../shared/base.component";

declare var $: any;


@Component({
    selector: 'setting',
    templateUrl: 'app/hotel/setting/setting.html'
})

export class SettingComponent extends BaseComponent {
    modalTitle: string;
    modalTextSave: string;
    constructor(
        public vm: ListModel<SystemSetting>,
        protected router: Router
    ) {
        super(router);
     }

    ngOnInit() {
        super.ngOnInit();
        this.vm.setCollection("SystemSetting");
        this.vm.obj = new SystemSetting();
        this.vm.loadData();
    }

    public select(obj: SystemSetting) {
        if (obj != undefined && obj !== null) {
            this.modalTitle = "Thông tin cấu hình";
            this.modalTextSave = " Cập nhật";
            Object.assign(this.vm.obj, obj);
        }
        else {
            this.vm.obj = new SystemSetting();
            this.modalTitle = "Thêm mới cấu hình";
            this.modalTextSave = " Tạo mới";
        }
    }

    public save() {
        this.vm.save();
        $("#editmodal").modal('hide');
    }

    public delete(obj: SystemSetting) {
        this.vm.obj = obj;
        this.vm.delete();
    }

    public updateStatus(id: string, active: boolean) {
        this.vm.updateStatus(id, active);
    }
}