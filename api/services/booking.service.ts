import { injectable } from 'inversify';

import { BookingRepository } from "../repositories/booking.repository";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { Booking } from "../../app/hotel/models/booking";

@injectable()
export class BookingService {
    constructor(private _bookingRepository: BookingRepository) {

    }
    public getRoomsAvalidable(fromDate: Date, toDate: Date): Promise<ResponseResult> {
        return this._bookingRepository.getRoomsAvalidable(fromDate, toDate);
    }

    public addNew(obj: Booking): Promise<ResponseResult> {
        return this._bookingRepository.addNew(obj);
    }

    public update(obj: Booking): Promise<ResponseResult> {
        return this._bookingRepository.update(obj);
    }

    public updateStatus(id: string, active: boolean): Promise<ResponseResult> {
        return this._bookingRepository.updateStatus(id, active);
    }

    public delete(id: string): Promise<ResponseResult> {
        return this._bookingRepository.delete(id);
    }
}