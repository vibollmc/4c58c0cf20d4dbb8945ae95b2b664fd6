import {MongodbModel} from './metadata/mongodbmodel';

export class SystemSetting extends MongodbModel {
    type: string;
    value: any;
    description: string;
}