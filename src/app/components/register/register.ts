import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth, Role } from '../../service/auth';
import { User } from '../../model/User';

@Component({
    selector: 'app-register',
    imports: [ReactiveFormsModule],
    templateUrl: './register.html',
    styleUrl: './register.css',
})
export class Register {
    authForm: FormGroup;

    constructor(private form: FormBuilder, private auth: Auth) {
        this.authForm = this.form.group({
            mail: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmitForm() {
        const newUser: User = new User(
            "",
            this.authForm.value.mail,
            this.authForm.value.password,
            [Role.User]
        );

        const registeredUser = this.auth.users.find((user: User) => (user.mail === newUser.mail) && (user.password == newUser.password));

        if (registeredUser) {
            console.log("Account, logged-in.");
        } else {
            console.log("Account does not exist.");
        }

        this.auth.currentUser = registeredUser;

        this.authForm.reset();
    }
}
