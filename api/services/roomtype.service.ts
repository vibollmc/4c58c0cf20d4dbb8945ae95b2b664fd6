import mongodb = require('mongodb');
import { injectable } from "inversify";

import { RoomtypeRepository } from "../repositories/roomtype.repository";
import { Roomtype } from "../../app/hotel/models/roomtype";
import { Status } from "../../app/hotel/models/enum";

@injectable()
export class RoomtypeService {
    
    constructor(private roomtypeRepository: RoomtypeRepository) {
    }

    public addNewRoomtype(roomtype: Roomtype, callBack: (err: mongodb.MongoError) => void) {
        this.roomtypeRepository.addNewRoomtype(roomtype, callBack);
    }

    public updateRoomtype(roomtype: Roomtype, callBack: (err: mongodb.MongoError) => void) {
        this.roomtypeRepository.updateRoomtype(roomtype, callBack);
    }

    public updateStatus(id: string, status: Status, callBack: (err: mongodb.MongoError) => void ) {
        this.roomtypeRepository.updateStatus(id, status, callBack);
    } 
    public getRoomtype(callBack: (data: mongodb.MongoError) => void) {
        this.roomtypeRepository.getRoomtype(callBack);
    }

    public test() {
        this.roomtypeRepository.test();
    }
}