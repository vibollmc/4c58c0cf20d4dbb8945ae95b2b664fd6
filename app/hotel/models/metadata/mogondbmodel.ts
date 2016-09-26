import mongodb = require('mongodb');

import {Status} from '../enum';

export class MongodbModel {
    _id: mongodb.ObjectID;
    status: Status;

    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;

    constructor() {
        this.status = Status.Active;
        this.createdAt = new Date();
        this.createdBy = null;
        this.updatedAt = null;
        this.updatedBy = null;
    }
}