import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { ListModel } from "../shared/list.model";
import { Customer } from "../models/customer";
import { BaseComponent } from "../shared/base.component";

declare var $: any;


@Component({
    selector: 'customer',
    templateUrl: 'app/hotel/customer/customer.html'
})

export class CustomerComponent extends BaseComponent {
    modalTitle: string;
    modalTextSave: string;
    constructor(
        public vm: ListModel<Customer>,
        protected router: Router
    ) {
        super(router);
     }

    ngOnInit() {
        super.ngOnInit();
        this.vm.setCollection("Customer");
        this.vm.obj = new Customer();
        this.vm.loadData();
    }

    public select(obj: Customer) {
        if (obj != undefined && obj !== null) {
            this.modalTitle = "Thông tin khách hàng";
            this.modalTextSave = " Cập nhật";
            this.vm.obj = obj;
        }
        else {
            this.vm.obj = new Customer();
            this.modalTitle = "Thêm mới khách hàng";
            this.modalTextSave = " Tạo mới";
        }
    }

    public save() {
        this.vm.save();
        $("#editmodal").modal('hide');
    }

    public delete(obj: Customer) {
        this.vm.obj = obj;
        this.vm.delete();
    }

    public updateStatus(id: string, active: boolean) {
        this.vm.updateStatus(id, active);
    }
}