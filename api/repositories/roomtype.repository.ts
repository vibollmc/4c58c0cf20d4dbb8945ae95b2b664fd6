import mongodb = require('mongodb');
import { injectable } from "inversify";

import { MongoDbAccess, Collections } from "../../dbservices/database.access";
import { Roomtype } from "../../app/hotel/models/roomtype";
import { Status } from "../../app/hotel/models/enum";

@injectable()
export class RoomtypeRepository {
    
    constructor(
        private mongoDbAccess: MongoDbAccess)
    {
    }

    public test() {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        var testData = new Roomtype();
        //testData._id = new mongodb.ObjectID();
        testData.createdAt = new Date();
        testData.name = "A";
        testData.status = Status.Active;
        testData.formulaByDay = "1";
        testData.formulaByHalfDay = "12";
        testData.formulaByHour = "24";

        console.log(testData);

        dbCollection.insertOne(testData)
            .then((result) => { console.log("Save data test successfully."); })
            .catch((err) => {});
    }

    public addNewRoomtype(roomtype: Roomtype): Promise<mongodb.InsertOneWriteOpResult> {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        roomtype.createdAt = new Date();

        return dbCollection.insertOne(roomtype);
    }

    public updateRoomtype(roomtype: Roomtype): Promise<mongodb.UpdateWriteOpResult> {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        roomtype.updatedAt = new Date();
        console.log(roomtype);
        var filter = { _id : new mongodb.ObjectID(roomtype._id) };
        roomtype._id = new mongodb.ObjectID(roomtype._id);
        return dbCollection.replaceOne(filter, roomtype);
    }

    public updateStatus(id: string, status: Status): Promise<mongodb.UpdateWriteOpResult> {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        var filter = { _id : new mongodb.ObjectID(id) };
        var update = { $set: { status: status, updatedAt: new Date() } };
        return dbCollection.updateOne(filter, update);
    }

    public deleteRoomtype(id: string): Promise<mongodb.DeleteWriteOpResultObject> {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        var filter = { _id : new mongodb.ObjectID(id) };
        return dbCollection.deleteOne(filter);
    }

    public getRoomtype(): Promise<Roomtype[]> {
        var dbCollection = this.mongoDbAccess.getCollection(Collections.roomtype);
        return dbCollection.find().toArray();
    }
}