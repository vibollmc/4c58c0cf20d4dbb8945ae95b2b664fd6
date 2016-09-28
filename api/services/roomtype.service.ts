import { injectable } from "inversify";

import { RoomtypeRepository } from "../repositories/roomtype.repository";
import { Roomtype } from "../../app/hotel/models/roomtype";
import { Status } from "../../app/hotel/models/enum";
import { ResponseResult } from "../../app/hotel/models/responseresults";

@injectable()
export class RoomtypeService {
    
    constructor(private roomtypeRepository: RoomtypeRepository) {
    }

    public addNewRoomtype(roomtype: Roomtype): Promise<ResponseResult> {
        return this.roomtypeRepository.addNewRoomtype(roomtype);
    }

    public updateRoomtype(roomtype: Roomtype): Promise<ResponseResult> {
        return this.roomtypeRepository.updateRoomtype(roomtype);
    }

    public updateStatus(id: string, status: Status): Promise<ResponseResult> {
        return this.roomtypeRepository.updateStatus(id, status);
    } 
    public getRoomtype(): Promise<ResponseResult> {
        return this.roomtypeRepository.getRoomtype();
    }
    public deleteRoomtype(id: string): Promise<ResponseResult> {
        return this.roomtypeRepository.deleteRoomtype(id);
    }

    public test() {
        this.roomtypeRepository.test();
    }
}