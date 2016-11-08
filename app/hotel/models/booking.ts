import { MongodbModel } from './metadata/mongodbmodel';
import { CustomerInfo } from './metadata/customer.info';
import { RoomBooking } from './metadata/room.booking';

export class Booking extends MongodbModel {
    customer: CustomerInfo;
    fromDate: Date;
    toDate: Date;
    rooms: Array<RoomBooking>;
    checkinId: string;
    constructor() {
        super();
        this.customer = new CustomerInfo();
        this.fromDate = null;
        this.toDate = null;
        this.rooms = new Array<RoomBooking>();
        this.checkinId = null;
    }
}