import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../service/auth';
import { Router } from '@angular/router';
import { Training } from '../../model/Training';
import { AdminService } from '../../service/admin-service';
import courses from "../../../../db.json"
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import localeFr from '@angular/common/locales/fr';
import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
registerLocaleData(localeFr);

@Component({
    selector: 'app-admin',
    imports: [ReactiveFormsModule, CommonModule, CurrencyPipe],
    templateUrl: './admin.html',
    styleUrl: './admin.css',
})
export class Admin implements OnInit {
    constructor(private auth: Auth, private router: Router, private admin: AdminService, private form: FormBuilder) {
        this.courseForm = this.form.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            price: [0, Validators.required]
        });
    }
    
	listTrainings!: Training[];
    courseForm: FormGroup;
    action: "create" | "edit" | null = null;
    currentCourse!: Training;

    ngOnInit(): void {
        if (this.auth.isLoggedIn() === false) {
            /*this.router.navigateByUrl("trainings");*/
        }

        this.listTrainings = courses.courses;
    }

    setAction(action: "create" | "edit") {
        this.action = action;

        if (action == "create") {
            console.log("Start create.");
            this.courseForm.reset();
        } if (action == "edit") {
            console.log("Start edit.");
        }
    }

    onSubmit() {
        if (this.action == "create") {
            this.createCourse();
        } if (this.action == "edit") {
            this.setUpdate();
        }
    }

    createCourse() {
        const newCourse = this.courseForm.value;

        this.addCourse(new Training(
            String(this.listTrainings.length+1),
            newCourse.name,
            newCourse.description,
            String(newCourse.price),
            String(1)
        ));
    }

    addCourse(course: Training) {
        const exists = this.listTrainings.find((c: Training) => c.id === course.id);
        if (exists) {
            return console.log("Exists.", exists);
        } else {
            console.log("Creating course...", exists);
        }

        this.admin.addCourse(course).subscribe({
            next: (data) => {
                console.log("Response body:", data);
            }
        });
    }

    updateCourse(course: Training) {
        this.currentCourse = course;
        
        this.courseForm.get("name")?.setValue(course.name);
        this.courseForm.get("description")?.setValue(course.description);
        this.courseForm.get("price")?.setValue(course.price);

        this.setAction("edit");
    }

    setUpdate() {
        const newCourse = this.courseForm.value;

        this.admin.updateCourse(new Training(
            String(this.currentCourse.id),
            newCourse.name,
            newCourse.description,
            String(newCourse.price),
            String(1)
        )).subscribe({
            next: (data) => {
                console.log("Response body:", data);
            }
        });
    }

    deletCourse(course: Training) {
        this.admin.deleteCourse(new Training(
            String(course.id),
            course.name,
            course.description,
            String(course.price),
            String(1)
        )).subscribe({
            next: (data) => {
                console.log("Response body:", data);
            }
        });
    }
}
