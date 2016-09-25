import mongodb = require('mongodb');
import { injectable } from "inversify";

import DatabaseConfig from "./config"; 

@injectable()
export class MongoDbAccess {
    private _server: mongodb.Server;
    private _db: mongodb.Db;
    constructor() {
        this._server = new mongodb.Server(DatabaseConfig.host, DatabaseConfig.port);
        this._db = new mongodb.Db(DatabaseConfig.databaseName, this._server, { w: 1 });
        this._db.open(function() {
            console.log("connected to database.");
        });
    }

    public getCollection(collectionName: string, callBack : (collection: mongodb.Collection) => void) {
        this._db.collection(collectionName, function(err, col ) {
            if(err) { console.error(err); return; }
        
            callBack(col);
        }); 
    }
}

export var Collections = {
    roomtype : "Roomtype"
}