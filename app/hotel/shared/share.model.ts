import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { ShareService } from './share.service';
import { Roomtype } from "../models/roomtype";
import { ResponseResult } from "../models/responseresults";
import { SystemSetting } from "../models/systemsetting";

@Injectable()
export class ShareModel {
    public loggedName: string;
    public get token(): string {
        return this.service.token;
    }
    public set token(token :string) {
        this.service.token = token;
    }

    constructor(private service: ShareService) {
        this.getLoggedName();

    }
    public getLoggedName() {
        if (this.token)
            this.service.getUserLogged().then((response) => {
                this.loggedName = response.data.fullName;
            });
        else this.loggedName = null;
    }

    public createAuthorizationHeader(): Headers {
        return this.service.createAuthorizationHeader();
    }

    public getRoomTypeActive(callback: (result: Roomtype[]) => void) {
        this.service.getRoomTypeActive()
            .then(response => callback(response.data as Roomtype[]));
    } 

    public getSystemSetting(type: string, callback: (result: SystemSetting) => void) {
        this.service.getSystemSetting(type)
            .then((response) => {
                if ((response.data as SystemSetting[]).length > 0)
                    callback(response.data[0] as SystemSetting);
                else
                    callback(new SystemSetting()); 
                });
    }
}