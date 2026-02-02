import { Injectable } from '@angular/core';
import { User } from '../model/User';

export enum Role {
    User = "USER",
    Admin = "ADMIN",
    Customer = "CUSTOMER"
}

@Injectable({
    providedIn: 'root',
})
export class Auth {
    constructor() { };

    users: User[] = [
        new User("admin@gmail.com", "root", [Role.User, Role.Admin]),
        new User("user@gmail.com", "1234", [Role.User])
    ];

    currentUser: User | undefined =  new User("", "", []);

    isLoggedIn(): boolean {
        return (this.currentUser != null && this.users.includes(this.currentUser));
    }

    isAdmin(): boolean {
        return (this.currentUser != undefined && this.currentUser.roles.includes(Role.Admin));
    }
}
