import mongodb = require('mongodb');
import { injectable } from "inversify";

import DatabaseConfig from "./config";

@injectable()
export class MongoDbAccess {
    private server: mongodb.Server;
    private db: mongodb.Db;
    constructor() {
        this.server = new mongodb.Server(DatabaseConfig.host, DatabaseConfig.port);
        this.db = new mongodb.Db(DatabaseConfig.databaseName, this.server, { w: 1 });
        this.db.open(() => {
            console.log("connected to database.");
        });
    }

    public getCollection(name: string) : mongodb.Collection {
        return this.db.collection(name);
    }
}

export var Collections = {
    roomtype: "Roomtype"
}