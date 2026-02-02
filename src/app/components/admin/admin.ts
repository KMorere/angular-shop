import { Component, OnInit } from '@angular/core';
import { Auth } from '../../service/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-admin',
    imports: [],
    templateUrl: './admin.html',
    styleUrl: './admin.css',
})
export class Admin implements OnInit {
    constructor(private auth: Auth, private router: Router) { }

    ngOnInit(): void {
        if (this.auth.isLoggedIn() === false) {
            this.router.navigateByUrl("trainings");
        }
    }
}
