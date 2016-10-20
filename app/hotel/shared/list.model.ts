import { Injectable } from '@angular/core';
import { HttpClient } from './http.client';

import { ListService } from "./list.service";
import { ResponseResult } from "../models/responseresults";
import { MongodbModel } from "../models/metadata/mongodbmodel";
import { ResultCode } from "../models/enum";
import { MessageProvider } from "../shared/message";

declare var toastr: any;
declare var $: any;

@Injectable()
export class ListModel<T extends MongodbModel> {
    obj: T;
    lstObj: T[];
    private _service: ListService<T>;
    constructor(
        http: HttpClient
    ) {

    }

    public setCollection(collectionName: string) {
        this._service.setUrlApi(collectionName);
    }

    public loadData() {
        this._service.get().then(
            response => {
                if (response.code === ResultCode.Success) {
                    this.lstObj = response.data as T[];
                }
                else {
                    this.lstObj = null;
                }
            });
    }

    public save() {
        if (this.obj === undefined || this.obj === null) return;

        if (this.obj._id === undefined
            || this.obj._id === null || this.obj._id === "") {
            this._service.addNew(this.obj).then(
                response => {
                    if (response.data === true) {
                        MessageProvider.saveSuccess();
                        this.loadData();
                    }
                    else MessageProvider.saveError(response.message);
                });
        }
        else {
            this._service.update(this.obj).then(
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

        this._service.updateStatus(id, active);
    }

    public delete() {
        if (this.obj._id === undefined
            || this.obj._id === null || this.obj._id === "") return;

        MessageProvider.confirmDelete(null,
            (result) => {
                if (result === false) return;

                this._service.delete(this.obj._id).then(
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