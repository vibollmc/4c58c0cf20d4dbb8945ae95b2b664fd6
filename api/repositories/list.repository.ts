import mongodb = require('mongodb');
import { injectable } from "inversify";

import { BaseRepository } from "./base.repository";
import { MongoDbAccess } from "../../dbservices/database.access";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { MongodbModel } from "../../app/hotel/models/metadata/mongodbmodel";

@injectable()
export class ListRepository extends BaseRepository {
    public set collectionName(name:string) {
        this.collection = name;
    } 
    
    constructor(
        protected mongoDbAccess: MongoDbAccess)
    {
        super(null);
    }

    public addNew(obj: any): Promise<ResponseResult> {
        var dbCollection = this.mongoDbAccess.getCollection(this.collection);
        obj.createdAt = new Date();

        return dbCollection.insertOne(obj)
            .then(data => this.createResultFromInsert(data))
            .catch(err => this.createResultFromError(err));
    }

    public update(obj: any): Promise<ResponseResult> {
        var dbCollection = this.mongoDbAccess.getCollection(this.collection);
        obj.updatedAt = new Date();
        
        var filter = { _id : new mongodb.ObjectID(obj._id) };
        obj._id = new mongodb.ObjectID(obj._id);
        return dbCollection.replaceOne(filter, obj)
            .then(data => this.createResultFromUpdate(data))
            .catch(err => this.createResultFromError(err));
    }

    public updateStatus(id: string, active: boolean): Promise<ResponseResult> {
        var dbCollection = this.mongoDbAccess.getCollection(this.collection);
        var filter = { _id : new mongodb.ObjectID(id) };
        var update = { $set: { active: active, updatedAt: new Date() } };
        return dbCollection.updateOne(filter, update)
            .then(data => this.createResultFromUpdate(data))
            .catch(err => this.createResultFromError(err));
    }

    public delete(id: string): Promise<ResponseResult> {
        var dbCollection = this.mongoDbAccess.getCollection(this.collection);
        var filter = { _id : new mongodb.ObjectID(id) };
        return dbCollection.deleteOne(filter)
            .then(data => this.createResultFromDelete(data))
            .catch(err => this.createResultFromError(err));
    }

    public get(): Promise<ResponseResult> {
        var dbCollection = this.mongoDbAccess.getCollection(this.collection);
        return dbCollection.find().toArray()
            .then(data => this.createResultFromSelect(data))
            .catch(err => this.createResultFromError(err));
    }
}