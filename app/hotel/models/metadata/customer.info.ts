export class CustomerInfo {
    _id: any;
    name: string;
    phoneNumber: string;
    email: string;
    representative: string;
    address: string;
    bankAccount: string;
    bankName: string;
    taxId: string;
    idNumber: string;
    description: string;
    
    constructor() {
        this.name = "";
        this.phoneNumber = null;
        this.email = null;
        this.representative = null;
        this.address = null;
        this.bankAccount = null;
        this.bankName = null;
        this.taxId = null;
        this.idNumber = null;
        this.description = null;
    }
}