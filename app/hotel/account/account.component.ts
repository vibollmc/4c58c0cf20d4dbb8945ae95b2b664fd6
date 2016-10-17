import { Component } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from 'moment';
import 'moment/locale/vi';

import { AccountModel } from "./account.model";
import { AccountService } from "./account.service";
import { User } from "../models/user";
import { Gender, GroupUser } from "../models/enum";
import { BaseComponent } from "../shared/base.component";

declare var $: any;


@Component({
    selector: 'account',
    providers: [
        AccountModel,
        AccountService
    ],
    templateUrl: 'app/hotel/account/account.html'
})

export class AccountComponent extends BaseComponent {
    modalTitle: string;
    modalTextSave: string;
    constructor(
        public vm: AccountModel,
        protected router: Router
    ) {
        super(router);
     }

    ngOnInit() {
        this.vm.loadData();
    }

    public detectGender(gender: Gender): string {
        if (gender == Gender.Male) return "Nam";
        if (gender == Gender.Female) return "Nữ";
        return "";
    }
    public detectGroupUser(group: GroupUser): string {
        if (group == GroupUser.Administrator) return "Quản trị hệ thống";
        if (group == GroupUser.Manager) return "Quản lý";
        if (group == GroupUser.Receptionist) return "Nhân viên";
        return "";
    }
    public detectLastLogin(lastLogin: string): string {
        if (lastLogin === undefined || lastLogin === null || lastLogin === "") return "";

        return moment(lastLogin).fromNow();
    } 

    public selectUser(user: User) {
        if (user != undefined && user !== null) {
            this.modalTitle = "Thông tin tài khoản";
            this.modalTextSave = " Cập nhật";
            this.vm.user = user;
        }
        else {
            this.vm.user = new User();
            this.modalTitle = "Thêm mới tài khoản";
            this.modalTextSave = " Tạo mới";
        }
    }

    public saveUser() {
        this.vm.save();
        $("#usermodal").modal('hide');
    }

    public deleteUser(user: User) {
        this.vm.user = user;
        this.vm.delete();
    }

    public updateStatus(id: string, active: boolean) {
        this.vm.updateStatus(id, active);
    }
}