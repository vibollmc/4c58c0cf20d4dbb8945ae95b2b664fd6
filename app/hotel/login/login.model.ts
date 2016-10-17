import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import CryptoJS = require("crypto-js");

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
        //if (sessionStorage.getItem(SystemConfig.keyToken)) this.router.navigate(['dashboard']);
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

                    //var data = JSON.stringify(response.data);
                    
                    //var enscryptText = CryptoJS.AES.encrypt(data, SystemConfig.keyEnscrypt).toString();

                    //sessionStorage.setItem(SystemConfig.keyUserLogin, JSON.stringify(enscryptText));

                    //sessionStorage.setItem(SystemConfig.keyToken, response.data)
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