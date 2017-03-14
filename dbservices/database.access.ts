import * as mongodb from 'mongodb';
import { injectable } from "inversify";

@injectable()
export class MongoDbAccess {
    private server: mongodb.Server;
    private db: mongodb.Db;
    constructor() {
    }

    public connectToDb() {
        let mongoClient = new mongodb.MongoClient();
        mongoClient.connect("mongodb://hmsadmin:hms123@ds023088.mlab.com:23088/hms_beta")
            .then((result) => {
                this.db = result;
                console.info("connected to database.");
            })
            .catch((err) => {
                this.db = null;
                console.error("cannot connect to database, please check connection string.");
            });
    }

    public getCollection(name: string) : mongodb.Collection {
        try {
            return this.db.collection(name);    
        } catch (error) {
            console.error('error occur: ' + error.message || error);
        }
    }
}

export var Collections = {
    roomtype: "Roomtype",
    user: "User",
    systemSetting: "SystemSetting",
    otherService: "OtherService",
    customer: "Customer",
    room: "Room",
    booking: "Booking",
    checkedIn: "checkedIn"
}