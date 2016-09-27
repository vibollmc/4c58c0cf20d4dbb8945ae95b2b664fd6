import mongodb = require('mongodb');
import { injectable } from "inversify";

import { RoomtypeRepository } from "../repositories/roomtype.repository";
import { Roomtype } from "../../app/hotel/models/roomtype";
import { Status } from "../../app/hotel/models/enum";

@injectable()
export class RoomtypeService {
    
    constructor(private roomtypeRepository: RoomtypeRepository) {
    }

    public addNewRoomtype(roomtype: Roomtype): Promise<mongodb.InsertOneWriteOpResult> {
        return this.roomtypeRepository.addNewRoomtype(roomtype);
    }

    public updateRoomtype(roomtype: Roomtype): Promise<mongodb.UpdateWriteOpResult> {
        return this.roomtypeRepository.updateRoomtype(roomtype);
    }

    public updateStatus(id: string, status: Status): Promise<mongodb.UpdateWriteOpResult> {
        return this.roomtypeRepository.updateStatus(id, status);
    } 
    public getRoomtype(): Promise<Roomtype[]> {
        return this.roomtypeRepository.getRoomtype();
    }

    public test() {
        this.roomtypeRepository.test();
    }
}