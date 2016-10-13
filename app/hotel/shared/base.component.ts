import { Injectable, AfterContentChecked, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import CryptoJS = require("crypto-js");

import { User } from "../models/user";
import SystemConfig from "../shared/config";

@Injectable()
export class BaseComponent implements AfterContentChecked, OnInit {

    private _userLogin: User = null;
    private _token: string;
    public get UserLogin(): User {
        return this._userLogin;
    }
    public get Token(): string {
        return this._token;
    }
    constructor(
        protected router: Router
    ) {

    }
    private checkLogin() {
        if (sessionStorage.getItem(SystemConfig.keyToken) === undefined ||
            sessionStorage.getItem(SystemConfig.keyToken) === null ||
            sessionStorage.getItem(SystemConfig.keyToken) === '')
            this.router.navigate(['login']);
        else {
            try {

                var encryptText = sessionStorage.getItem(SystemConfig.keyUserLogin).replace('"', '');

                var data = CryptoJS.AES.decrypt(encryptText, SystemConfig.keyEnscrypt).toString(CryptoJS.enc.Utf8);

                this._userLogin = JSON.parse(data) as User;

                this._token = sessionStorage.getItem(SystemConfig.keyToken);
            }
            catch (ex) {
                sessionStorage.removeItem(SystemConfig.keyToken);
                this.router.navigate(['login']);
            }
        }
    }
    ngOnInit() {
        this.checkLogin();
    }
    ngAfterContentChecked() {
        this.checkLogin();
    }
}