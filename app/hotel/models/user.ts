import {MongodbModel} from './metadata/mongodbmodel';
import {Gender, GroupUser} from './enum';
export class User extends MongodbModel {
    

    username: string;
    password: string;
    fullName: string;
    DOB: Date;
    gender: Gender;
    phoneNumber: string;
    idNumber: string;
    urlImage: string
    group: GroupUser;
    lastLoginDate: Date;

    constructor() {
        super();
        this.username = null;
        this.password = null;
        this.fullName = null;
        this.DOB = null;
        this.gender = null;
        this.phoneNumber = null;
        this.idNumber = null;
        this.urlImage = null;
        this.group = null;
        this.lastLoginDate = null;
    }
}