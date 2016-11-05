import { injectable } from 'inversify';

import { BookingRepository } from "../repositories/booking.repository";
import { ResponseResult } from "../../app/hotel/models/responseresults";

@injectable()
export class BookingService {
    constructor(private _bookingRepository: BookingRepository) {

    }
    public getRoomsAvalidable(fromDate: Date, toDate: Date): Promise<ResponseResult> {
        return this._bookingRepository.getRoomsAvalidable(fromDate, toDate);
    }
}