import {MongodbModel} from './metadata/mongodbmodel';

export class SystemSetting extends MongodbModel {
    type: string;
    value: any;
    description: string;

    constructor() {
        super();
        this.type = null;
        this.value = null;
        this.description = null;
    }
}