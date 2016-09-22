import {Component, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';


declare var $;
@Component({
    selector: "hms-app",
    templateUrl: "app/hotel.html"
})

export class HotelComponent implements AfterViewInit {
    
    constructor(private router: Router) { }

    ngAfterViewInit(): any {
        $("#side-menu").metisMenu();
    }
}