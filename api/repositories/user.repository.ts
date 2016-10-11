import mongodb = require('mongodb');
import { injectable } from "inversify";
import crypto = require('crypto');

import { BaseRepository } from "./base.repository";
import { MongoDbAccess, Collections } from "../../dbservices/database.access";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { User } from "../../app/hotel/models/user";
import { GroupUser } from "../../app/hotel/models/enum";

@injectable()
export class UserRepository extends BaseRepository {
    constructor(
        private _mongoDbAccess: MongoDbAccess
    ) {
        super(Collections.user);
    }

    private hashMd5(password: string): string {
        if (password.match(/[0-9a-f]{32}/g)) return password;

        var name = 'hmsbeta';
        var hash = crypto.createHash('md5').update(password, 'utf8').digest('hex');
        return hash;
    }
    public test() {
        var dbCollection = this._mongoDbAccess.getCollection(this.collection);
        var testData = new User();

        testData.username = "admin";
        testData.fullName = "Administrator";
        testData.group = GroupUser.Administrator;
        testData.password = this.hashMd5("admin123");

        console.log(testData);

        dbCollection.insertOne(testData)
            .then((result) => { console.log("Save data test successfully."); })
            .catch((err) => { });
    }

    public addNewUser(user: User): Promise<ResponseResult> {
        var dbCollection = this._mongoDbAccess.getCollection(this.collection);
        user.createdAt = new Date();
        user.password = this.hashMd5(user.password);

        return dbCollection.insertOne(user)
            .then(data => this.createResultFromInsert(data))
            .catch(err => this.createResultFromError(err));
    }

    public updateUser(user: User): Promise<ResponseResult> {
        var dbCollection = this._mongoDbAccess.getCollection(this.collection);
        user.updatedAt = new Date();
        user.password = this.hashMd5(user.password);
        var filter = { _id: new mongodb.ObjectID(user._id) };
        user._id = new mongodb.ObjectID(user._id);
        return dbCollection.replaceOne(filter, user)
            .then(data => this.createResultFromUpdate(data))
            .catch(err => this.createResultFromError(err));
    }

    public updateStatus(id: string, active: boolean): Promise<ResponseResult> {
        var dbCollection = this._mongoDbAccess.getCollection(this.collection);
        var filter = { _id: new mongodb.ObjectID(id) };
        var update = { $set: { active: active, updatedAt: new Date() } };
        return dbCollection.updateOne(filter, update)
            .then(data => this.createResultFromUpdate(data))
            .catch(err => this.createResultFromError(err));
    }

    public deleteUser(id: string): Promise<ResponseResult> {
        var dbCollection = this._mongoDbAccess.getCollection(this.collection);
        var filter = { _id: new mongodb.ObjectID(id) };
        return dbCollection.deleteOne(filter)
            .then(data => this.createResultFromDelete(data))
            .catch(err => this.createResultFromError(err));
    }

    public getUser(): Promise<ResponseResult> {
        var dbCollection = this._mongoDbAccess.getCollection(this.collection);
        return dbCollection.find().toArray()
            .then(data => this.createResultFromSelect(data))
            .catch(err => this.createResultFromError(err));
    }
    public login(username: string, password: string): Promise<ResponseResult> {
        var dbCollection = this._mongoDbAccess.getCollection(this.collection);
        var filter = { username: username, password: this.hashMd5(password), active: true };
        var update = { $set: {lastLoginDate: new Date() }};
        return dbCollection.findOneAndUpdate(filter, update)
            .then(data => this.createResultFromFindAndUpdate(data))
            .catch(err => this.createResultFromError(err));
    }
}