import { Injectable } from '@angular/core';

import { HttpClient } from '../shared/http.client';
import 'rxjs/add/operator/toPromise';

import SystemConfig from "../shared/config";
import { Roomtype } from "../models/roomtype";
import { ResponseResult } from "../models/responseresults";

declare var bootbox: BootboxStatic;

@Injectable()
export class ListService<T> {
    private _urlGet: string;
    private _urlAddNew: string;
    private _urlUpdate: string;
    private _urlDelete: string;
    private _urlUpdateStatus: string;

    constructor(
        private http: HttpClient,
    ) {
        
    }

    public setUrlApi(collectionName: string) {
        this._urlGet = `${SystemConfig.apiHost}/list/${collectionName}`;
        this._urlAddNew = `${SystemConfig.apiHost}/list/${collectionName}/add`;
        this._urlUpdate = `${SystemConfig.apiHost}/list/${collectionName}/update`;
        this._urlDelete = `${SystemConfig.apiHost}/list/${collectionName}/delete`;
        this._urlUpdateStatus = `${SystemConfig.apiHost}/list/${collectionName}/status`;
    }

    private handleError(error: any) {
        bootbox.alert("An error accurred " + error.message || error);
    }
    public get(): Promise<ResponseResult> {
        return this.http.get(this._urlGet)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
    public addNew(obj: T): Promise<ResponseResult> {
        return this.http.post(this._urlAddNew, obj)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
    public update(obj: T): Promise<ResponseResult> {
        return this.http.post(this._urlUpdate, obj)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
    public delete(id: string): Promise<ResponseResult> {
        return this.http.get(this._urlDelete + "/" + id)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
    public updateStatus(id: string, active: boolean) {
        return this.http.post(this._urlUpdateStatus, {id: id, active: active})
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
}