import { Injectable } from '@angular/core';
import { RoomtypeService } from "./roomtype.service";

import { Roomtype } from "../models/roomtype";
import { Status } from "../models/enum";
import { ResponseResult } from "../models/responseresults";
import { ResultCode } from "../models/enum";
import { MessageProvider } from "../shared/message";

declare var toastr: any;
declare var $: any;

@Injectable()
export class RoomtypeModel {
    roomtype: Roomtype;
    lstRoomtype: Roomtype[];
    constructor(
        private roomtypeService: RoomtypeService
    ) {
        this.roomtype = new Roomtype();
    }

    public loadData() {
        this.roomtypeService.get().then(
            response => {
                if (response.code === ResultCode.Success) {
                    this.lstRoomtype = response.data as Roomtype[];
                }
                else {
                    this.lstRoomtype = null;
                }
            });
    }

    public save() {
        if (this.roomtype._id === undefined
            || this.roomtype._id === null || this.roomtype._id === "") {
            this.roomtypeService.addNew(this.roomtype).then(
                response => {
                    if (response.data === true) {
                        MessageProvider.saveSuccess();
                        this.loadData();
                    }
                    else MessageProvider.saveError(response.message);
                });
        }
        else {
            this.roomtypeService.update(this.roomtype).then(
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

    public updateStatus(id: string, status: Status) {
        if (id === undefined || id === null || id === "") return;

        this.roomtypeService.updateStatus(id, status);
    }

    public delete() {
        if (this.roomtype._id === undefined
            || this.roomtype._id === null || this.roomtype._id === "") return;

        MessageProvider.confirmDelete(null,
            (result) => {
                if (result === false) return;

                this.roomtypeService.delete(this.roomtype._id).then(
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