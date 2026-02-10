import { Injectable } from '@angular/core';
import { User } from '../model/User';
import db from '../../../db.json'
import { Encryption } from './encryption';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum Role {
    User = "USER",
    Admin = "ADMIN",
    Customer = "CUSTOMER"
}

@Injectable({
    providedIn: 'root',
})
export class Auth {
    constructor(private http: HttpClient, private enc: Encryption) { };

    users: User[] = db.users;

    currentUser: User | undefined =  new User("", "", "", []);

    isLoggedIn(): boolean {
        return (this.currentUser != null && this.users.includes(this.currentUser));
    }

    isAdmin(): boolean {
        return (this.currentUser != undefined && this.currentUser.roles.includes(Role.Admin));
    }

    logOff() {
        this.currentUser = new User("", "", "", []);
    }

    getUser(id: string): Observable<any> {
        return this.http.get("http://localhost:3000/users/"+id);
    }

    addUser(user: User): Observable<any> {
        const newUser: User = user;
        /*newUser.password = this.enc.encrypt(newUser.password);*/
        return this.http.post("http://localhost:3000/users", JSON.stringify(user));
    }
}
