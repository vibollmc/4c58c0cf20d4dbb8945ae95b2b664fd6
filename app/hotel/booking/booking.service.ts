import { Injectable } from '@angular/core';

import { HttpClient } from '../shared/http.client';
import { BaseService } from '../shared/base.service';
import { ResponseResult } from '../models/responseresults';
import { Booking } from '../models/booking';
import { Customer } from '../models/customer';
import SystemConfig from '../shared/config';

@Injectable()
export class BookingService extends BaseService {
    private _apiGetRoom: string;
    private _apiGetCustomer: string;
    constructor(
        private http: HttpClient
    ) {
        super();
        this._apiGetRoom = SystemConfig.apiHost + '/booking/roomavalidable';
        this._apiGetCustomer = SystemConfig.apiHost + '/list/Customer';
    }

    public getCustomer(): Promise<ResponseResult> {
        return this.http.post(this._apiGetCustomer, {active: true})
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }

    public getRoomAvalidable(fromDate: Date, toDate: Date): Promise<ResponseResult> {
        return this.http.post(this._apiGetRoom, 
            {fromDate: fromDate, toDate: toDate})
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
}