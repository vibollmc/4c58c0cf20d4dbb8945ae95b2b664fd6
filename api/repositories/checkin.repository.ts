import * as mongodb from 'mongodb';
import { injectable } from "inversify";

import { BaseRepository } from "./base.repository";
import { MongoDbAccess, Collections } from "../../dbservices/database.access";
import { ResponseResult } from "../../app/hotel/models/responseresults";
import { Room } from "../../app/hotel/models/room";
import { CheckedIn } from "../../app/hotel/models/checkedIn";
import { Customer } from "../../app/hotel/models/customer";
import { CustomerInfo } from "../../app/hotel/models/metadata/customer.info";

@injectable()
export class CheckInRepository extends BaseRepository {
    constructor(
        protected mongoDbAccess: MongoDbAccess
    ) {
        super(Collections.checkedIn);
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

    public addNew(checkedIn: CheckedIn): Promise<ResponseResult> {
        let dbCollection = this.mongoDbAccess.getCollection(this.collection);
        checkedIn.createdAt = new Date();
        if (checkedIn.customer._id)
            return dbCollection.insertOne(checkedIn)
                .then(data => this.createResultFromInsert(data))
                .catch(err => this.createResultFromError(err));
        
        let customerCollection = this.mongoDbAccess.getCollection(Collections.customer);
        let customer = this.convertToCustomer(checkedIn.customer);
        customer.createdBy = checkedIn.createdBy;

        return customerCollection.insertOne(customer)
            .then((data) => {
                checkedIn.customer._id = data.insertedId.toHexString();
                return dbCollection.insertOne(checkedIn)
                    .then(data => this.createResultFromInsert(data))
                    .catch(err => this.createResultFromError(err)); 
            })
            .catch(err => this.createResultFromError(err));
    }

    public update(checkedIn: CheckedIn): Promise<ResponseResult> {
        let dbCollection = this.mongoDbAccess.getCollection(this.collection);
        checkedIn.updatedAt = new Date();

        let filter = { _id: new mongodb.ObjectID(checkedIn._id) };

        checkedIn._id = new mongodb.ObjectID(checkedIn._id);

        return dbCollection.replaceOne(filter, checkedIn)
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
}