import { Injectable } from '@angular/core';
import SystemConfig from './config';

declare var bootbox: BootboxStatic;

@Injectable()
export class BaseService {
    constructor() {}

    public handleError(error: any) {
        sessionStorage.setItem(SystemConfig.isAjaxProcessing, "false");
        bootbox.alert("An error accurred " + error.message || error);
    }
}