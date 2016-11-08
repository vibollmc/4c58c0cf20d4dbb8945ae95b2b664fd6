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
    private _apiAddnewBooking: string;
    private _apiUpdateBooking: string;
    private _apiDeleteBooking: string;
    private _apiUpdateStatusBooking: string;

    constructor(
        private http: HttpClient
    ) {
        super();
        this._apiGetRoom = SystemConfig.apiHost + '/booking/roomavalidable';
        this._apiGetCustomer = SystemConfig.apiHost + '/list/Customer';
        this._apiAddnewBooking = SystemConfig.apiHost + '/booking/add';
        this._apiUpdateBooking = SystemConfig.apiHost + '/booking/update';
        this._apiDeleteBooking = SystemConfig.apiHost + '/booking/delete';
        this._apiUpdateStatusBooking = SystemConfig.apiHost + '/booking/status';
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
    
    public addNew(booking: Booking): Promise<ResponseResult> {
        return this.http.post(this._apiAddnewBooking, booking)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }
    public update(booking: Booking): Promise<ResponseResult> {
        return this.http.post(this._apiUpdateBooking, booking)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
    public delete(id: string): Promise<ResponseResult> {
        return this.http.get(this._apiDeleteBooking + "/" + id)
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
    public updateStatus(id: string, active: boolean) {
        return this.http.post(this._apiUpdateStatusBooking, {id: id, active: active})
            .toPromise()
            .then(response => response.json() as ResponseResult)
            .catch(this.handleError);
    }
}