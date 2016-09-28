import { Component } from "@angular/core";

import { LoginModel } from "./login.model";

@Component({
    selector: 'login',
    templateUrl: 'app/hotel/login/login.html'
})

export class LoginComponent {
    constructor(
        public vm: LoginModel)
    {}

    public login() {
        this.vm.login();
    }
}