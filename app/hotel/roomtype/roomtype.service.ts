import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import SystemConfig from "../shared/config";
import { Roomtype } from "../models/roomtype";
import { ResponseResult } from "../models/responseresults";
import { BaseService } from "../shared/base.service";


@Injectable()
export class RoomtypeService extends BaseService  {
    private readonly urlGet: string;
    private readonly urlAddNew: string;
    private readonly urlUpdate: string;
    private readonly urlDelete: string;
    private readonly urlUpdateStatus: string;
    constructor(
        private http: Http
    ) {
        super();
        this.urlGet = SystemConfig.apiHost + "/roomtype";
        this.urlAddNew = SystemConfig.apiHost + "/roomtype/add";
        this.urlUpdate = SystemConfig.apiHost + "/roomtype/update";
        this.urlDelete = SystemConfig.apiHost + "/roomtype/delete";
        this.urlUpdateStatus = SystemConfig.apiHost + "/roomtype/status";
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
    public updateStatus(id: string, active: boolean) {
        return this.http.post(this.urlUpdateStatus, {id: id, active: active})
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
}