import { MongodbModel } from './metadata/mongodbmodel';
import { CustomerInfo } from './metadata/customer.info';
import { RoomInfo } from './metadata/room.info';

export class Booking extends MongodbModel {
    customer: CustomerInfo;
    fromDate: Date;
    toDate: Date;
    rooms: Array<RoomInfo>;
    checkinId: string;
    constructor() {
        super();
        this.customer = new CustomerInfo();
        this.fromDate = null;
        this.toDate = null;
        this.rooms = new Array<RoomInfo>();
        this.checkinId = null;
    }
}