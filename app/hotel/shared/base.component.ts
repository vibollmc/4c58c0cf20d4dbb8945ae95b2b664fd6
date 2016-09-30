import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import CryptoJS = require("crypto-js");

import { User } from "../models/user";
import SystemConfig from "../shared/config";

@Injectable()
export class BaseComponent implements OnInit {

    private _userLogin: User = null;

    public get UserLogin(): User {
        return this._userLogin;
    }

    constructor(
        protected router: Router
    ) {

    }
    ngOnInit() {
        if (localStorage.getItem(SystemConfig.keyUserLogin) === undefined ||
            localStorage.getItem(SystemConfig.keyUserLogin) === null ||
            localStorage.getItem(SystemConfig.keyUserLogin) === '')
            this.router.navigate(['login']);
        else {
            try {

                var encryptText = localStorage.getItem(SystemConfig.keyUserLogin).replace('"','');

                var data = CryptoJS.AES.decrypt(encryptText, SystemConfig.keyEnscrypt).toString(CryptoJS.enc.Utf8);

                this._userLogin = JSON.parse(data) as User;
            }
            catch (ex) {
                localStorage.removeItem(SystemConfig.keyUserLogin);
                this.router.navigate(['login']);
            }
        }
    }
}