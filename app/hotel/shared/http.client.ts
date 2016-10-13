import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import SystemConfig from "../shared/config";

@Injectable()
export class HttpClient {
    constructor(private http: Http) {
    }

    private createAuthorizationHeader(): Headers {
        let headers = new Headers();
        headers.append('x-access-token', sessionStorage.getItem(SystemConfig.keyToken));
        return headers;
    }

    public get(url) {
        return this.http.get(url, {
            headers: this.createAuthorizationHeader()
        });
    }

    public post(url, data) {
        return this.http.post(url, data, {
            headers: this.createAuthorizationHeader()
        });
    }
}