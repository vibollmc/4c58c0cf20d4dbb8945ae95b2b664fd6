import mongodb = require('mongodb');
import { injectable } from "inversify";

import { RoomtypeRepository } from "../repositories/roomtype.repository";
import { Roomtype } from "../../models/roomtype";
import { Status } from "../../models/enum";

@injectable()
export class RoomtypeService {
    private _roomtypeRepository: RoomtypeRepository;
    constructor(roomtypeRepository: RoomtypeRepository) {
        this._roomtypeRepository = roomtypeRepository;
    }

    public addNewRoomtype(roomtype: Roomtype, callBack: (err: mongodb.MongoError) => void) {
        this._roomtypeRepository.addNewRoomtype(roomtype, callBack);
    }

    public updateRoomtype(roomtype: Roomtype, callBack: (err: mongodb.MongoError) => void) {
        this._roomtypeRepository.updateRoomtype(roomtype, callBack);
    }

    public updateStatus(id: string, status: Status, callBack: (err: mongodb.MongoError) => void ) {
        this._roomtypeRepository.updateStatus(id, status, callBack);
    } 
    public getRoomtype(callBack: (data: mongodb.MongoError) => void) {
        this._roomtypeRepository.getRoomtype(callBack);
    }

    public test() {
        this._roomtypeRepository.test();
    }
}