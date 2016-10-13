import { Injectable } from '@angular/core';
import { HttpClient } from '../shared/http.client';
import 'rxjs/add/operator/toPromise';

import { BaseService } from "../shared/base.service";
import SystemConfig from "../shared/config";
import { User } from "../models/user";
import { ResponseResult } from "../models/responseresults";

@Injectable()
export class AccountService extends BaseService {
    private readonly urlGet: string;
    private readonly urlAddNew: string;
    private readonly urlUpdate: string;
    private readonly urlDelete: string;
    private readonly urlUpdateStatus: string;

    constructor(
        private http: HttpClient
    ) {
        super();
        this.urlGet = SystemConfig.apiHost + "/user";
        this.urlAddNew = SystemConfig.apiHost + "/user/add";
        this.urlUpdate = SystemConfig.apiHost + "/user/update";
        this.urlDelete = SystemConfig.apiHost + "/user/delete";
        this.urlUpdateStatus = SystemConfig.apiHost + "/user/status";
    }
    public get(): Promise<ResponseResult> {
        return this.http.get(this.urlGet)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
    public addNew(user: User): Promise<ResponseResult> {
        return this.http.post(this.urlAddNew, user)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
    public update(user: User): Promise<ResponseResult> {
        return this.http.post(this.urlUpdate, user)
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