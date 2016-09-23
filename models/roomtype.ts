import {MongodbModel} from './metadata/mogondbmodel';

export class Roomtype extends MongodbModel {
    name: string;
    FormulaByDay: string;
    FormulaByHour: string;
    FormulaByHalfDay: string;
}