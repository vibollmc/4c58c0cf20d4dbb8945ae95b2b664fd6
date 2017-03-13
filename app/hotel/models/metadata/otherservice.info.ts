import { ServiceType } from '../enum';

export class OtherServiceInfo {
    name: string;
    quantity: number;
    unit: string;
    price: number;
    serviceType: ServiceType;

    constructor() {
        this.name = null;
        this.quantity = null;
        this.price = null;
        this.serviceType = null;
        this.unit = null;
    }
}