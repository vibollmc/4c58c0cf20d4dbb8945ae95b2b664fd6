import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import SystemConfig from './config';

@Injectable()
export class ShareService {
    private _apiUrlUserLogged: string;
    public get token(): string {
        return sessionStorage.getItem(SystemConfig.keyToken);
    }
    public set token(token: string) {
        if (token) sessionStorage.setItem(SystemConfig.keyToken, token);
        else sessionStorage.removeItem(SystemConfig.keyToken);
    }
    constructor(private http: Http) {
        this._apiUrlUserLogged = SystemConfig.apiHost + '/user/logged';
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
}