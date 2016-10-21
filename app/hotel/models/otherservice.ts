import {MongodbModel} from './metadata/mongodbmodel';
import { ServiceType } from './enum';

export class OtherService extends MongodbModel {
    name: string;
    inStock: number;
    unit: string;
    price: number;
    serviceType: ServiceType;
    constructor() {
        super();
        this.name = null;
        this.inStock = null;
        this.price = null;
        this.serviceType = null;
    }
}