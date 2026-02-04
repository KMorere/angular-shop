import { Role } from "../service/auth";

export class User {
    id: string
    mail: string;
    password: string;
    roles: Role[] | string[];

    constructor(id: string, mail: string, password: string, roles: Role[] | string[]) {
        this.id = id;
        this.mail = mail;
        this.password = password;
        this.roles = roles;
    }
};