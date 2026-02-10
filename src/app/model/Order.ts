import { Training } from "./Training";

export class Order {
    firstName: string;
    lastName: string;
    address: string;
    phone: string
    mail: string;
    date: Date;
    total: number;
    courses: Training[];

    constructor(id: number, firstName: string, lastName: string, address: string, phone: string, mail: string, total: number, courses: Training[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.mail = mail;
        this.date = new Date()
        this.total = total;
        this.courses = courses;
    }
};