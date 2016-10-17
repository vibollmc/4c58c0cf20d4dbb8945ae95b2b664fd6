import { Component } from "@angular/core";

import { LoginModel } from "./login.model";
import { LoginService } from "./login.service";

@Component({
    selector: 'login',
    providers: [
        LoginModel,
        LoginService
    ],
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