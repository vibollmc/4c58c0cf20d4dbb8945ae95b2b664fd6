import mongodb = require('mongodb');
import assert = require('assert');
import { injectable } from "inversify";

import { MongoDbAccess } from "../dbservices/database.access";
import { Roomtype } from "../models/roomtype";
import { Status } from "../models/enum";

@injectable()
export class RoomtypeRepository {
    private roomtypeCollectionName = "Roomtype";
    
    constructor(
        private mongoDbAccess: MongoDbAccess
    )
    {
    }

    public addNewRoomtype(roomtype: Roomtype, callBack: () => void) {
        this.mongoDbAccess.getCollection(this.roomtypeCollectionName, 
        (collection: mongodb.Collection) => {
            collection.insertOne(roomtype, 
            (err, results) => {
                assert.equal(err, null);
                callBack();
            });
        });
    }

    public updateRoomtype(roomtype: Roomtype, callBack: () => void) {
        this.mongoDbAccess.getCollection(this.roomtypeCollectionName,
        (collection: mongodb.Collection)=> {
            collection.updateOne({_id: roomtype._id}, roomtype, 
            (err, results) => {
                assert.equal(err, null);
                callBack();
            });
        });
    }


    public updateStatus(id: mongodb.ObjectID, status: Status, callBack: () => void ) {
        this.mongoDbAccess.getCollection(this.roomtypeCollectionName,
        (collection) => {
            collection.updateOne({_id: id}, 
            {
                $set: { status: status, updatedAt: new Date(Date.now())}
            },
            (err, results) => {
                assert.equal(err, null);
                callBack();
            });
        });
    }

    public getRoomtype(callBack: (any) => void) {
        this.mongoDbAccess.getCollection(this.roomtypeCollectionName,
        (collection) => {
            collection.find({}).toArray().then((result) => {
                callBack(result);
            })
        });
        
    }
}