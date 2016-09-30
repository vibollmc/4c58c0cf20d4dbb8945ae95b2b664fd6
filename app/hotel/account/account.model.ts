import { Injectable } from '@angular/core';
import { AccountService } from "./account.service";

import { User } from "../models/user";
import { ResponseResult } from "../models/responseresults";
import { ResultCode } from "../models/enum";
import { MessageProvider } from "../shared/message";

declare var toastr: any;
declare var $: any;

@Injectable()
export class AccountModel {
    user: User;
    lstUser: User[];
    constructor(
        private userService: AccountService
    ) {
        this.user = new User();
    }

    public loadData() {
        this.userService.get().then(
            response => {
                if (response.code === ResultCode.Success) {
                    this.lstUser = response.data as User[];
                }
                else {
                    this.lstUser = null;
                }
            });
    }

    public save() {
        if (this.user._id === undefined
            || this.user._id === null || this.user._id === "") {
            this.userService.addNew(this.user).then(
                response => {
                    if (response.data === true) {
                        MessageProvider.saveSuccess();
                        this.loadData();
                    }
                    else MessageProvider.saveError(response.message);
                });
        }
        else {
            this.userService.update(this.user).then(
                response => {
                    if (response.data === true) {
                        MessageProvider.saveSuccess();
                        this.loadData();
                    }
                    else MessageProvider.saveError(response.message);
                }
            );
        }
    }

    public updateStatus(id: string, active: boolean) {
        if (id === undefined || id === null || id === "") return;

        this.userService.updateStatus(id, active);
    }

    public delete() {
        if (this.user._id === undefined
            || this.user._id === null || this.user._id === "") return;

        MessageProvider.confirmDelete(null,
            (result) => {
                if (result === false) return;

                this.userService.delete(this.user._id).then(
                    response => {
                        if (response.data === true) {
                            MessageProvider.deleteSuccess();
                            this.loadData();
                        }
                        else MessageProvider.deleteError(response.message);
                    }
                );
            });
    }
}