import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import { LoginService } from "./login.service";
import { User } from "../models/user";

@Injectable()
export class LoginModel {
    username: string;
    password: string;
    message: string;

    constructor(
        private loginService: LoginService,
        private router: Router
    ) {
        if (localStorage.getItem('id') !== undefined &&
            localStorage.getItem('id') !== null &&
            localStorage.getItem('id') !== '') this.router.navigate(['dashboard']);

        this.username = null;
        this.password = null;
        this.message = null;

    }

    public login() {
        this.loginService.login(this.username, this.password)
            .then((response) => {
                if (response.data) {
                    var data = response.data as User;
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('id', data._id);
                    localStorage.setItem('fullname', data.fullName);
                    localStorage.setItem('urlimage', data.urlImage);

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