import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import SystemConfig from "../shared/config";
import { ShareModel } from "../shared/share.model";

@Injectable()
export class HttpClient {
    constructor(private http: Http, private sm: ShareModel) {
    }

    public get(url: string) {
        return this.http.get(url, {
            headers: this.sm.createAuthorizationHeader()
        });
    }

    public post(url: string, body: any) {
        return this.http.post(url, body, {
            headers: this.sm.createAuthorizationHeader()
        });
    }
}