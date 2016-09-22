var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/HMSBeta");

export class DatabaseAccess {
    private _dbConnected: boolean;
    constructor() {
        var db = mongoose.connection;
        db.on('error', function() {
          console.error.bind(console, 'connection error:');
          this._dbConnected = false;  
        });
        db.once('open', function() {
            this._dbConnected = true;
        });
    }

    getCollection(name: string, dataSchema: any): any {
        return mongoose.Model(name, dataSchema);
    }
}
