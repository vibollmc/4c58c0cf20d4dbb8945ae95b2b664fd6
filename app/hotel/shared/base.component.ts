import { Injectable, AfterContentChecked, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import CryptoJS = require("crypto-js");

import { User } from "../models/user";
import SystemConfig from "../shared/config";

@Injectable()
export class BaseComponent implements AfterContentChecked, OnInit {
    vi: any;
    constructor(
        protected router: Router
    ) {
        this.vi = {
            firstDayOfWeek: 1,
            dayNames: [ "Chủ Nhật","Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7" ],
            dayNamesShort: [ "CN","T2","T3","T4","T5","T6","T7" ],
            dayNamesMin: [ "CN","T2","T3","T4","T5","T6","T7" ],
            monthNames: [ "Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12" ],
            monthNamesShort: [ "Thg1","Thg2","Thg3","Thg4","Thg5","Thg6","Thg7","Thg8","Thg9","Thg10","Thg11","Thg12" ]
        }
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