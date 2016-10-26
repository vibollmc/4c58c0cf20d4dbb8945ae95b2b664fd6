import { Injectable, AfterContentChecked, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import CryptoJS = require("crypto-js");

import { User } from "../models/user";
import SystemConfig from "../shared/config";

@Injectable()
export class BaseComponent implements AfterContentChecked, OnInit {

    constructor(
        protected router: Router
    ) {

    }
    private checkLogin() {
        if (!sessionStorage.getItem(SystemConfig.keyToken))
            this.router.navigate(['login']);
    }
    ngOnInit() {
        this.checkLogin();
    }
    ngAfterContentChecked() {
        this.checkLogin();
    }

    public makeArray(length: number): number[] {
        let x=[];
        let i=1;
        while(x.push(i++)<length){};
        return x
    }
}