import {MongodbModel} from './metadata/mongodbmodel';

export class Roomtype extends MongodbModel {
    name: string;
    formulaByDay: string;
    formulaByHour: string;
    formulaByHalfDay: string;
    color: string;

    constructor() {
        super();
        this.name = null;
        this.formulaByDay = null;
        this.formulaByHalfDay = null;
        this.formulaByHour = null;
        this.color = "#fff";
    }
}