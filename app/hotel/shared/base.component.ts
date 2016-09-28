import { Injectable, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class BaseComponent implements OnInit {
    constructor(
        protected router: Router
    ) {

    }
    ngOnInit() {
        if (localStorage.getItem('id') === undefined ||
            localStorage.getItem('id') === null ||
            localStorage.getItem('id') === '') 
            this.router.navigate(['login']);
    }
}