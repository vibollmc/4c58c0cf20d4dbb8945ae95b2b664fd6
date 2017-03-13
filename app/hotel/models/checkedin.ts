import { MongodbModel } from './metadata/mongodbmodel';
import { CustomerInfo } from './metadata/customer.info';
import { RoomInfo } from './metadata/room.info';
import { OtherServiceInfo } from './metadata/otherservice.info';

export class CheckedIn extends MongodbModel {
    customer: CustomerInfo;
    rooms: Array<RoomInfo>;
    otherService: Array<OtherServiceInfo>;
    checkInDate: Date;
    checkOutDate: Date;
    planCheckOutDate: Date;
    invoice: boolean;
    changedRoombyId: any;
    description: string;

    constructor() {
        super();
        this.customer = new CustomerInfo();
        this.rooms = new Array<RoomInfo>();
        this.otherService = new Array<OtherServiceInfo>();
        this.checkInDate = new Date();
        this.checkOutDate = null;
        this.planCheckOutDate = null;
        this.invoice = false;
        this.changedRoombyId = null;
        this.description = null;
    }
}