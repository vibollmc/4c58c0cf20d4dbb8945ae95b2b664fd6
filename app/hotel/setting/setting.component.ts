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
        this.vm.setCollection("SystemSetting");
        this.vm.obj = new SystemSetting();
        this.vm.loadData();
    }

    public selectSetting(setting: SystemSetting) {
        if (setting != undefined && setting !== null) {
            this.modalTitle = "Thông tin thiết lập";
            this.modalTextSave = " Cập nhật";
            this.vm.obj = setting;
        }
        else {
            this.vm.obj = new SystemSetting();
            this.modalTitle = "Thêm mới thiết lập";
            this.modalTextSave = " Tạo mới";
        }
    }

    public saveSetting() {
        this.vm.save();
        $("#settingmodal").modal('hide');
    }

    public deleteSetting(setting: SystemSetting) {
        this.vm.obj = setting;
        this.vm.delete();
    }

    public updateStatus(id: string, active: boolean) {
        this.vm.updateStatus(id, active);
    }
}