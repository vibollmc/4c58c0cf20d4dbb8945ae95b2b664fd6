import { Injectable } from '@angular/core';

declare var bootbox: BootboxStatic;

@Injectable()
export class BaseService {
    constructor() {}

    protected handleError(error: any) {
        bootbox.alert("An error accurred " + error.message || error);
    }
}