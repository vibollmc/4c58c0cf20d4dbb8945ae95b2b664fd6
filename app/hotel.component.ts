import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from "./hotel/shared/base.component";

import SystemConfig from "./hotel/shared/config";
declare var $;
@Component({
    selector: "hms-app",
    templateUrl: "app/hotel.html"
})

export class HotelComponent extends BaseComponent implements AfterViewInit {
    public get currentPage() : string {
        return location.pathname.substr(1).toLowerCase();
    } 
    
    constructor(
        protected router: Router) {
        super(router);
    }
    ngOnInit() {
        super.ngOnInit();
    }

    ngAfterViewInit(): any {
        $("#side-menu").metisMenu();
    }

    public logout() {
        localStorage.removeItem(SystemConfig.keyUserLogin);
        this.router.navigate(['login']);
    }
}