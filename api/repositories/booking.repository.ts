import * as mongodb from 'mongodb';
import { injectable } from "inversify";

import { BaseRepository } from "./base.repository";
import { MongoDbAccess, Collections } from "../../dbservices/database.access";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { Room } from "../../app/hotel/models/room";
import { Booking } from "../../app/hotel/models/booking";

@injectable()
export class BookingRepository extends BaseRepository {
    constructor(
        protected mongoDbAccess: MongoDbAccess
    ) {
        super(Collections.booking);
    }

    public getRoomsAvalidable(fromDate: Date, toDate: Date): Promise<ResponseResult> {
        var dbCollection = this.mongoDbAccess.getCollection(this.collection);

        var filter = {
            $or: [
                {
                    $and: [
                        {
                            'fromDate': { $lt: fromDate }
                        },
                        {
                            'toDate': { $gt: fromDate }
                        }
                    ]
                },
                {
                    $and: [
                        {
                            'fromDate': { $lt: toDate }
                        },
                        {
                            'toDate': { $gt: toDate }
                        }
                    ]
                }
            ]
        };

        return dbCollection.find(filter).toArray()
            .then(data => this.getRoomAvalidableFromOldBooking(data))
            .catch(err => this.createResultFromError(err));
    }

    private getRoomAvalidableFromOldBooking(data: Booking[]): Promise<ResponseResult> {
        let dbCollection = this.mongoDbAccess.getCollection(Collections.room);

        let filter = {
            $and: [
            ]
        };
        data.forEach(b => {
            b.rooms.forEach(r => {
                filter.$and.push({
                    name: { $ne: r.name }
                });
            });
        });

        filter.$and.push({active: {$eq: true}});

        return dbCollection.find(filter).toArray()
            .then((data) => this.createResultFromSelect(data))
            .catch(err => this.createResultFromError(err));
    }

    public addNew(booking: Booking): Promise<ResponseResult> {
        let dbCollection = this.mongoDbAccess.getCollection(this.collection);
        booking.createdAt = new Date();

        return dbCollection.insertOne(booking)
            .then(data => this.createResultFromInsert(data))
            .catch(err => this.createResultFromError(err));
    }

    public update(booking: Booking): Promise<ResponseResult> {
        let dbCollection = this.mongoDbAccess.getCollection(this.collection);
        booking.updatedAt = new Date();

        var filter = { _id: new mongodb.ObjectID(booking._id) };

        booking._id = new mongodb.ObjectID(booking._id);

        return dbCollection.replaceOne(filter, booking)
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
}