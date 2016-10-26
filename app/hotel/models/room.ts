import {MongodbModel} from './metadata/mongodbmodel';
import {RoomStatus} from './enum';


export class Room extends MongodbModel {
    name: string;
    roomtype: string;
    floor: number;
    roomStatus: RoomStatus;
    description: string;

    constructor() {
        super();
        this.name = null;
        this.roomtype = null;
        this.floor = null;
        this.roomStatus = RoomStatus.Undefined;
        this.description = null;
    }
}