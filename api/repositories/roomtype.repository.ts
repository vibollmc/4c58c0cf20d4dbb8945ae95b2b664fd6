import mongodb = require('mongodb');
import { injectable } from "inversify";

import { BaseRepository } from "./base.repository";
import { MongoDbAccess, Collections } from "../../dbservices/database.access";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { Roomtype } from "../../app/hotel/models/roomtype";

@injectable()
export class RoomtypeRepository extends BaseRepository {
    
    constructor(
        private mongoDbAccess: MongoDbAccess)
    {
        super(Collections.roomtype);
    }

    public test() {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        var testData = new Roomtype();
        //testData._id = new mongodb.ObjectID();
        testData.createdAt = new Date();
        testData.name = "A";
        testData.formulaByDay = "1";
        testData.formulaByHalfDay = "12";
        testData.formulaByHour = "24";

        console.log(testData);

        dbCollection.insertOne(testData)
            .then((result) => { console.log("Save data test successfully."); })
            .catch((err) => {});
    }

    public addNewRoomtype(roomtype: Roomtype): Promise<ResponseResult> {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        roomtype.createdAt = new Date();

        return dbCollection.insertOne(roomtype)
            .then(data => this.createResultFromInsert(data))
            .catch(err => this.createResultFromError(err));
    }

    public updateRoomtype(roomtype: Roomtype): Promise<ResponseResult> {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        roomtype.updatedAt = new Date();
        
        var filter = { _id : new mongodb.ObjectID(roomtype._id) };
        roomtype._id = new mongodb.ObjectID(roomtype._id);
        return dbCollection.replaceOne(filter, roomtype)
            .then(data => this.createResultFromUpdate(data))
            .catch(err => this.createResultFromError(err));
    }

    public updateStatus(id: string, active: boolean): Promise<ResponseResult> {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        var filter = { _id : new mongodb.ObjectID(id) };
        var update = { $set: { active: active, updatedAt: new Date() } };
        return dbCollection.updateOne(filter, update)
            .then(data => this.createResultFromUpdate(data))
            .catch(err => this.createResultFromError(err));
    }

    public deleteRoomtype(id: string): Promise<ResponseResult> {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        var filter = { _id : new mongodb.ObjectID(id) };
        return dbCollection.deleteOne(filter)
            .then(data => this.createResultFromDelete(data))
            .catch(err => this.createResultFromError(err));
    }

    public getRoomtype(): Promise<ResponseResult> {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        return dbCollection.find().toArray()
            .then(data => this.createResultFromSelect(data))
            .catch(err => this.createResultFromError(err));
    }
}