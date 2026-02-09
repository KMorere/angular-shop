import { Component, OnInit, signal } from '@angular/core';
import { RouterLinkWithHref, Router } from '@angular/router';
import courses from "../../../../db.json"
import { Training } from '../../model/Training';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from '../../service/cart';
import { Auth } from '../../service/auth';
import { Register } from '../../components/register/register';
import { ThemeService } from '../../service/theme-service';

import { MatBadgeModule } from '@angular/material/badge';
import { CartNavbar } from "../cart-navbar/cart-navbar";

@Component({
    selector: 'app-headbar',
    imports: [RouterLinkWithHref, ReactiveFormsModule, Register, MatBadgeModule, CartNavbar],
    templateUrl: './headbar.html',
    styleUrl: './headbar.css',
})
export class Headbar implements OnInit {
    protected readonly title = signal('trainings-shop');

	constructor(public cart: CartService, private router: Router, public auth: Auth, public theme: ThemeService) { }

    searchForm!: FormGroup;

    coursesArray = courses.courses;

    ngOnInit(): void {
        this.searchForm = new FormGroup({
            text: new FormControl("")
        });
        
        this.searchForm.valueChanges.subscribe(value => {
            this.onSearchCourse();
            this.createSearchValues(this.coursesArray);
        });

        this.createSearchValues(this.coursesArray);
    }

    createSearchValues(items: any) {
        const coursesDropdown = document.getElementById("coursesSearch");

        if (courses.courses.length == 0 || this.coursesArray.length == 0) {
            let courseDiv: HTMLDivElement = document.createElement("div");
            courseDiv.textContent = "No results found";
            
            coursesDropdown?.appendChild(courseDiv);
        } else if (this.onSearchCourse() == "") {
            this.coursesArray = courses.courses;
        }
    }

    onSearchCourse() {
        let key: string = this.searchForm.value.text.toLocaleLowerCase();

        this.coursesArray = this.coursesArray.filter((course) => ((course.name + " " + course.description).toLocaleLowerCase().includes(key)));

        return key
    }

	onAddToCart(course: Training) {
		console.log("Added " + course.quantity + " " + course.name + ".");
		this.cart.addCourse(course);
		this.router.navigateByUrl("cart")
	}

    toggleTheme() {
        this.theme.toggleTheme();
    }
}
