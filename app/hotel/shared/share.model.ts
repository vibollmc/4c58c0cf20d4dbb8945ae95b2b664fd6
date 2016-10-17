import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { ShareService } from './share.service';

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
}