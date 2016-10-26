import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import SystemConfig from './config';
import { BaseService } from './base.service';
import { ResponseResult } from "../models/responseresults";

@Injectable()
export class ShareService extends BaseService {
    private _apiUrlUserLogged: string;
    private _apiGetRoomType: string;
    private _apiGetSystemSetting: string;

    public get token(): string {
        return sessionStorage.getItem(SystemConfig.keyToken);
    }
    public set token(token: string) {
        if (token) sessionStorage.setItem(SystemConfig.keyToken, token);
        else sessionStorage.removeItem(SystemConfig.keyToken);
    }
    constructor(private http: Http) {
        super();
        this._apiUrlUserLogged = SystemConfig.apiHost + '/user/logged';
        this._apiGetRoomType = SystemConfig.apiHost + '/list/Roomtype';
        this._apiGetSystemSetting = SystemConfig.apiHost + '/list/SystemSetting';
    }
    public createAuthorizationHeader(): Headers {
        let header = new Headers();
        header.append('x-access-token', this.token);
        return header;
    }
    public getUserLogged(): Promise<any> {
        
        return this.http.get(this._apiUrlUserLogged, {headers: this.createAuthorizationHeader()})
            .toPromise()
            .then(response => response.json());
    }
    public getRoomTypeActive(): Promise<ResponseResult> {
        return this.http.post(this._apiGetRoomType, { active: true }, {headers: this.createAuthorizationHeader()})
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }

    public getSystemSetting(type: string): Promise<ResponseResult> {
        return this.http.post(this._apiGetSystemSetting, {type: type}, {headers: this.createAuthorizationHeader()})
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
}