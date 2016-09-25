import {MongodbModel} from './metadata/mogondbmodel';

export class Roomtype extends MongodbModel {
    name: string;
    formulaByDay: string;
    formulaByHour: string;
    formulaByHalfDay: string;
}