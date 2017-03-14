import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import {ShareModel} from "../shared/share.model";
import SystemConfig from "../shared/config";
import { LoginService } from "./login.service";
import { User } from "../models/user";

@Injectable()
export class LoginModel {
    username: string;
    password: string;
    message: string;

    constructor(
        private loginService: LoginService,
        private router: Router,
        private shareModel: ShareModel
    ) {
        if (this.shareModel.token) this.router.navigate(['dashboard']);

        this.username = null;
        this.password = null;
        this.message = null;

    }

    public login() {
        this.loginService.login(this.username, this.password)
            .then((response) => {
                if (response.data) {
                    this.username = null;
                    this.password = null;
                    this.message = null;

                    this.shareModel.token = response.data;
                    this.shareModel.getLoggedName();
                    this.router.navigate(['dashboard']);
                }
                else {
                    this.message = "Đăng nhập không thành công. sai tên đăng nhập hoặc mật khẩu."    
                }
            })
            .catch((err) => {
                this.message = "Đăng nhập không thành công. sai tên đăng nhập hoặc mật khẩu."
            });
    }
}