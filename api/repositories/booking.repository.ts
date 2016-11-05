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
        protected mongodbAccess: MongoDbAccess
    ) {
        super(Collections.booking);
    }

    public getRoomsAvalidable(fromDate: Date, toDate: Date): Promise<ResponseResult> {
        var dbCollection = this.mongodbAccess.getCollection(this.collection);

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
        let dbCollection = this.mongodbAccess.getCollection(Collections.room);

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
}