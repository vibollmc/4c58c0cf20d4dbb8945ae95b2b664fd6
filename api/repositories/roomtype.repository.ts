import mongodb = require('mongodb');
import assert = require('assert');
import { injectable } from "inversify";

import { MongoDbAccess } from "../../dbservices/database.access";
import { Roomtype } from "../../models/roomtype";
import { Status } from "../../models/enum";

@injectable()
export class RoomtypeRepository {
    private _roomtypeCollectionName = "Roomtype";
    private _mongoDbAccess: MongoDbAccess;
    constructor(mongoDbAccess: MongoDbAccess)
    {
        this._mongoDbAccess = mongoDbAccess;
    }

    public test() {
        this._mongoDbAccess.getCollection(this._roomtypeCollectionName,
        (collection) => {
            var testData = new Roomtype();
            //testData._id = new mongodb.ObjectID();
            testData.createdAt = new Date();
            testData.name = "A";
            testData.status = Status.Active;
            testData.FormulaByDay = "1";
            testData.FormulaByHalfDay = "12";
            testData.FormulaByHour = "24";

            console.log(testData);

            collection.insertOne(testData, 
            (err, results) => {
                if (err) console.error(err.message);
                else console.log("Save data test successfully.");
            });
        });
    }

    public addNewRoomtype(roomtype: Roomtype, callBack: (err: mongodb.MongoError) => void) {
        this._mongoDbAccess.getCollection(this._roomtypeCollectionName, 
        (collection: mongodb.Collection) => {
            collection.insertOne(roomtype, 
            (err, results) => {
                assert.equal(err, null);
                callBack(err);
            });
        });
    }

    public updateRoomtype(roomtype: Roomtype, callBack: (err: mongodb.MongoError) => void) {
        this._mongoDbAccess.getCollection(this._roomtypeCollectionName,
        (collection: mongodb.Collection)=> {
            collection.updateOne({_id: roomtype._id}, roomtype, 
            (err, results) => {
                assert.equal(err, null);
                callBack(err);
            });
        });
    }


    public updateStatus(id: string, status: Status, callBack: (err: mongodb.MongoError) => void ) {
        this._mongoDbAccess.getCollection(this._roomtypeCollectionName,
        (collection) => {
            collection.updateOne({_id: id}, 
            {
                $set: { status: status, updatedAt: new Date(Date.now())}
            },
            (err, results) => {
                assert.equal(err, null);
                callBack(err);
            });
        });
    }

    public getRoomtype(callBack: (data: any) => void) {
        this._mongoDbAccess.getCollection(this._roomtypeCollectionName,
        (collection) => {
            collection.find().toArray().then((result) => {
                callBack(result);
            })
        });
        
    }
}