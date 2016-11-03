import { Component, AfterViewInit, AfterContentChecked, AfterContentInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';

import { ShareModel } from "./hotel/shared/share.model";
import { HotelModel } from "./hotel.model";
import { HotelService } from "./hotel.service";
import SystemConfig from "./hotel/shared/config";

declare var $;

@Component({
    selector: "hms-app",
    providers: [
        HotelModel,
        HotelService
    ],
    templateUrl: "app/hotel.html"
})

export class HotelComponent implements AfterViewInit, AfterContentChecked, AfterContentInit, AfterViewChecked {
    public get currentPage() : string {
        return location.pathname.substr(1).toLowerCase();
    } 
    
    constructor(
        protected router: Router,
        public vm: HotelModel,
        public sm: ShareModel) {
    }
    ngOnInit() {
        //console.log('OnInit');
    }

    ngAfterViewInit(): any {
        $("#side-menu").metisMenu();
        //console.log('AfterViewInit');
    }

    ngAfterContentChecked() {
        //console.log('AfterContentChecked');
        if (!this.router.isActive('login', true))
            if (!this.sm.token) this.router.navigate(['login']);
    }
    ngAfterContentInit() {
        //console.log('AfterContentInit');
    }
    ngAfterViewChecked() {
        //console.log('AfterViewChecked');
    }
    public logout() {
        //sessionStorage.removeItem(SystemConfig.keyToken);
        this.sm.token = null;
        this.sm.loggedName = null;
        this.router.navigate(['login']);
    }
    public getDisplayProcessBar() {
        if (this.sm.isAjaxProcessing)
            return {'display': ''};

        return {'display': 'none'};
    }
}