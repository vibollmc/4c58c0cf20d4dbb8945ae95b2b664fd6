import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import SystemConfig from "../shared/config";
import { Roomtype } from "../models/roomtype";
import { ResponseResult } from "../models/responseresults";

declare var bootbox: BootboxStatic;

@Injectable()
export class RoomtypeService {
    private urlGet: string;
    private urlAddNew: string;
    private urlUpdate: string;
    private urlDelete: string;
    constructor(
        private http: Http
    ) {
        this.urlGet = SystemConfig.apiHost + "/roomtype";
        this.urlAddNew = SystemConfig.apiHost + "/roomtype/add";
        this.urlUpdate = SystemConfig.apiHost + "/roomtype/update";
        this.urlDelete = SystemConfig.apiHost + "/roomtype/delete";
    }

    private handleError(error: any) {
        bootbox.alert("An error accurred " + error.message || error);
    }

    public get(): Promise<ResponseResult> {
        return this.http.get(this.urlGet)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
    public addNew(roomtype: Roomtype): Promise<ResponseResult> {
        return this.http.post(this.urlAddNew, roomtype)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
    public update(roomtype: Roomtype): Promise<ResponseResult> {
        return this.http.post(this.urlUpdate, roomtype)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
    public delete(id: string): Promise<ResponseResult> {
        return this.http.get(this.urlDelete + "/" + id)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
}