import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import SystemConfig from "../shared/config";
import { Roomtype } from "../models/roomtype";
import { ResponseResult } from "../models/responseresults";

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
        this.urlAddNew = SystemConfig.apiHost + "/add";
        this.urlUpdate = SystemConfig.apiHost + "/update";
        this.urlDelete = SystemConfig.apiHost + "/delete";
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
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
        return this.http.get(this.urlGet + "/" + id, )
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
}