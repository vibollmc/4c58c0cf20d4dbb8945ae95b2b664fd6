import mongodb = require('mongodb');
import assert = require('assert');
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
        this.mongoDbAccess.getCollection(Collections.roomtype,
        (collection) => {
            var testData = new Roomtype();
            //testData._id = new mongodb.ObjectID();
            testData.createdAt = new Date();
            testData.name = "A";
            testData.status = Status.Active;
            testData.formulaByDay = "1";
            testData.formulaByHalfDay = "12";
            testData.formulaByHour = "24";

            console.log(testData);

            collection.insertOne(testData, 
            (err, results) => {
                if (err) console.error(err.message);
                else console.log("Save data test successfully.");
            });
        });
    }

    public addNewRoomtype(roomtype: Roomtype, callBack: (err: mongodb.MongoError) => void) {
        roomtype.createdAt = new Date();
        this.mongoDbAccess.getCollection(Collections.roomtype, 
        (collection: mongodb.Collection) => {
            collection.insertOne(roomtype, 
            (err, results) => {
                assert.equal(err, null);
                callBack(err);
            });
        });
    }

    public updateRoomtype(roomtype: Roomtype, callBack: (err: mongodb.MongoError) => void) {
        roomtype.updatedAt = new Date();
        this.mongoDbAccess.getCollection(Collections.roomtype,
        (collection: mongodb.Collection)=> {
            collection.updateOne({_id: roomtype._id}, roomtype, 
            (err, results) => {
                assert.equal(err, null);
                callBack(err);
            });
        });
    }


    public updateStatus(id: string, status: Status, callBack: (err: mongodb.MongoError) => void ) {
        this.mongoDbAccess.getCollection(Collections.roomtype,
        (collection) => {
            collection.updateOne({_id: id}, 
            {
                $set: { status: status, updatedAt: new Date()}
            },
            (err, results) => {
                assert.equal(err, null);
                callBack(err);
            });
        });
    }

    public getRoomtype(callBack: (data: any) => void) {
        this.mongoDbAccess.getCollection(Collections.roomtype,
        (collection) => {
            collection.find().toArray().then((result) => {
                callBack(result);
            })
        });
        
    }
}