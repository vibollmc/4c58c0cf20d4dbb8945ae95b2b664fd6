export class MongodbModel {
    _id: any;
    active: boolean;

    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;

    constructor() {
        this.active = true;
        this.createdAt = new Date();
        this.createdBy = null;
        this.updatedAt = null;
        this.updatedBy = null;
    }
}