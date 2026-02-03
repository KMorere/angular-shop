import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../service/auth';
import { Router } from '@angular/router';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Training } from '../../model/Training';

@Component({
    selector: 'app-admin',
    imports: [],
    templateUrl: './admin.html',
    styleUrl: './admin.css',
})
export class Admin implements OnInit {
    constructor(private auth: Auth, private router: Router, private http: HttpClient) { }

    ngOnInit(): void {
        if (this.auth.isLoggedIn() === false) {
            /*this.router.navigateByUrl("trainings");*/
        }

        this.addCourse(new Training(
            4,
            "Test",
            "Testing",
            1250,
            1
        ));
    }

    addCourse(course: Training) {
        this.http.post("http://localhost:3000/courses", JSON.stringify(course));
        console.log(JSON.stringify(course));
    }
}
