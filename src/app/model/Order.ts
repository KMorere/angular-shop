export class Order {
    firstName: string;
    lastName: string;
    address: string;
    phone: string
    mail: string;
    date: Date;
    total: number;

    constructor(id: number, firstName: string, lastName: string, address: string, phone: string, mail: string, total: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.mail = mail;
        this.date = new Date()
        this.total = total;
    }
};