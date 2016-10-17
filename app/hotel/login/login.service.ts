import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import SystemConfig from "../shared/config";
import { ResponseResult } from "../models/responseresults";

@Injectable()
export class LoginService {

    constructor(
        private http: Http
    ) { }

    private handleError(error: any) {
        bootbox.alert("An error accurred " + error.message || error);
    }

    public login(username: string, password: string): Promise<ResponseResult> {
        return this.http.post(SystemConfig.apiHost + "/user/login", {username: username, password: password})
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
}