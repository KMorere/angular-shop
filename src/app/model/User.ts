import { Role } from "../service/auth";

export class User {
    mail: string;
    password: string;
    roles: Role[];

    constructor(mail: string, password: string, roles: Role[]) {
        this.mail = mail;
        this.password = password;
        this.roles = roles;
    }
};