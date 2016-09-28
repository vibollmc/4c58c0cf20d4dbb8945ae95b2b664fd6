import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { BaseComponent } from "../shared/base.component";

@Component({
    selector: 'dashboard',
    templateUrl: 'app/hotel/dashboard/dashboard.html',
})
export class DashboardComponent extends BaseComponent {   
    constructor(protected router: Router) {
        super(router);
    }

    ngOnInit(): void {
        super.ngOnInit();
    }
}