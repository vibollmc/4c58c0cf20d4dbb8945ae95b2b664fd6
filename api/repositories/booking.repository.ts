import * as mongodb from 'mongodb';
import { injectable } from "inversify";

import { BaseRepository } from "./base.repository";
import { MongoDbAccess, Collections } from "../../dbservices/database.access";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { Room } from "../../app/hotel/models/room";
import { Booking } from "../../app/hotel/models/booking";
import { Customer } from "../../app/hotel/models/customer";
import { CustomerInfo } from "../../app/hotel/models/metadata/customer.info";

@injectable()
export class BookingRepository extends BaseRepository {
    constructor(
        protected mongoDbAccess: MongoDbAccess
    ) {
        super(Collections.booking);
    }

    public getRoomsAvalidable(fromDate: Date, toDate: Date): Promise<ResponseResult> {
        let dbCollection = this.mongoDbAccess.getCollection(this.collection);

        let filter = {
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

    private convertToCustomer(customerInfo: CustomerInfo): Customer {
        let customer = new Customer();

        customer._id = customerInfo._id;
        customer.name = customerInfo.name;
        customer.phoneNumber = customerInfo.phoneNumber;
        customer.email = customerInfo.email;
        customer.representative = customerInfo.representative;
        customer.address = customerInfo.address;
        customer.bankAccount = customerInfo.bankAccount;
        customer.bankName = customerInfo.bankName;
        customer.taxId = customerInfo.taxId;
        customer.idNumber = customerInfo.idNumber;
        customer.description = customerInfo.description;

        return customer;
    }

    public addNew(booking: Booking): Promise<ResponseResult> {
        let dbCollection = this.mongoDbAccess.getCollection(this.collection);
        booking.createdAt = new Date();
        if (booking.customer._id)
            return dbCollection.insertOne(booking)
                .then(data => this.createResultFromInsert(data))
                .catch(err => this.createResultFromError(err));
        
        let customerCollection = this.mongoDbAccess.getCollection(Collections.customer);
        let customer = this.convertToCustomer(booking.customer);
        customer.createdBy = booking.createdBy;

        return customerCollection.insertOne(customer)
            .then((data) => {
                booking.customer._id = data.insertedId.toHexString();
                return dbCollection.insertOne(booking)
                    .then(data => this.createResultFromInsert(data))
                    .catch(err => this.createResultFromError(err)); 
            })
            .catch(err => this.createResultFromError(err));
    }

    public update(booking: Booking): Promise<ResponseResult> {
        let dbCollection = this.mongoDbAccess.getCollection(this.collection);
        booking.updatedAt = new Date();

        let filter = { _id: new mongodb.ObjectID(booking._id) };

        booking._id = new mongodb.ObjectID(booking._id);

        return dbCollection.replaceOne(filter, booking)
            .then(data => this.createResultFromUpdate(data))
            .catch(err => this.createResultFromError(err));
    }

    public updateStatus(id: string, active: boolean): Promise<ResponseResult> {
        let dbCollection = this.mongoDbAccess.getCollection(this.collection);
        let filter = { _id : new mongodb.ObjectID(id) };
        let update = { $set: { active: active, updatedAt: new Date() } };
        return dbCollection.updateOne(filter, update)
            .then(data => this.createResultFromUpdate(data))
            .catch(err => this.createResultFromError(err));
    }

    public delete(id: string): Promise<ResponseResult> {
        let dbCollection = this.mongoDbAccess.getCollection(this.collection);
        let filter = { _id : new mongodb.ObjectID(id) };
        return dbCollection.deleteOne(filter)
            .then(data => this.createResultFromDelete(data))
            .catch(err => this.createResultFromError(err));
    }

    public search(fromDate: Date, toDate: Date, searchText: string): Promise<ResponseResult> {
        let filter;
        if (searchText) {
            filter = {
                $and: [
                    {
                        $or: [
                            {
                                $and: [
                                    {
                                        'fromDate': { $gte: fromDate }
                                    },
                                    {
                                        'fromDate': { $lte: toDate }
                                    }
                                ]
                            },
                            {
                                $and: [
                                    {
                                        'toDate': { $gte: fromDate }
                                    },
                                    {
                                        'toDate': { $lte: toDate }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        $or: [
                            {
                                'customer.phone': "/" + searchText + "/"
                            },
                            {
                                'customer.name': "/" + searchText + "/"
                            }
                        ]
                    }
                ]
            };
        }
        else {
            filter = 
            {
                $or: [
                    {
                        $and: [
                            {
                                'fromDate': { $gte: fromDate }
                            },
                            {
                                'fromDate': { $lte: toDate }
                            }
                        ]
                    },
                    {
                        $and: [
                            {
                                'toDate': { $gte: fromDate }
                            },
                            {
                                'toDate': { $lte: toDate }
                            }
                        ]
                    }
                ]
            };      
        }

        let dbCollection = this.mongoDbAccess.getCollection(this.collection); 

        return dbCollection.find(filter).toArray()
            .then(data => this.createResultFromSelect(data))
            .catch(err => this.createResultFromError(err));
    }
}