import { Injectable } from '@angular/core';

import { BaseService } from '../shared/base.service';
import { HttpClient} from "../shared/http.client";
import SystemConfig from "../shared/config";
import { ResponseResult } from "../models/responseresults";

@Injectable()
export class LoginService extends BaseService {

    constructor(
        private http: HttpClient
    ) {
        super()
    }

    public login(username: string, password: string): Promise<ResponseResult> {
        return this.http.post(SystemConfig.apiHost + "/user/login", {username: username, password: password})
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
}