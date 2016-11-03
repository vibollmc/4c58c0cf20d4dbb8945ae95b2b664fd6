import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AccountModel } from "./account.model";
import { AccountService } from "./account.service";
import { User } from "../models/user";
import { DropDownObject } from "../models/metadata/dropdown.object";
import { Gender, GroupUser } from "../models/enum";
import { BaseComponent } from "../shared/base.component";

declare var $: any;
declare var moment: any;

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
    genderOption: DropDownObject[];
    groupUserOption: DropDownObject[];
    constructor(
        public vm: AccountModel,
        protected router: Router
    ) {
        super(router);
        this.genderOption = new Array<DropDownObject>();
        this.genderOption.push(new DropDownObject("", ""));
        this.genderOption.push(new DropDownObject("Nam", 1));
        this.genderOption.push(new DropDownObject("Nữ", 1));

        this.groupUserOption = new Array<DropDownObject>();
        this.groupUserOption.push(new DropDownObject("", ""));
        this.groupUserOption.push(new DropDownObject("Nhân viên", 3));
        this.groupUserOption.push(new DropDownObject("Quản lý", 2));
        this.groupUserOption.push(new DropDownObject("Quản trị hệ thống", 1));
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
            Object.assign(this.vm.user, user);
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