import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Training } from '../../model/Training';
import { CartService } from '../../service/cart';
import { Router } from '@angular/router';
import courses from "../../../../db.json"

import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import localeFr from '@angular/common/locales/fr';
import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
registerLocaleData(localeFr);

@Component({
	selector: 'app-trainings',
	imports: [CommonModule, CurrencyPipe, MatGridListModule, MatPaginatorModule, MatTableModule],
	templateUrl: './trainings.html',
	styleUrl: './trainings.css',
})
export class Trainings implements OnInit {
	listTrainings: Training[] | undefined = [];
	gridCourses: Training[] = [];
	min: number = 0;
	max: number = 0;
	
	totalPages: number = 0;

	public currentIndex = 0;

	pageCount = 10;

	showGrid: boolean = false;
	
	constructor(private cart: CartService, private router: Router) { }

	ngOnInit(): void {
		this.listTrainings = courses.courses;
		this.gridCourses = this.listTrainings;

		let price = document.getElementById("priceMax");
		this.max = this.getHighest();
		if (price != undefined) {
			price.innerText = this.max.toString();
		}
	}

	paginateCard(event: PageEvent) {
		if (this.listTrainings) {
			this.currentIndex = event.pageIndex;
			this.pageCount = event.pageSize;
			this.gridCourses = this.listTrainings.slice(this.currentIndex * this.pageCount, this.currentIndex + this.pageCount);
			console.log(this.gridCourses, this.currentIndex, this.pageCount);
		}
	}

	onAddToCart(course: Training) {
		console.log("Added " + course.quantity + " " + course.name + ".");
		this.cart.addCourse(course);
		this.router.navigateByUrl("cart")
	}

	getCart(): number {
		return this.cart.getTotal();
	}

	updateQuantity(course: Training, amount: string) {
		const parsedAmount = Number(amount);
		if (!isNaN(parsedAmount)) {
			course.quantity = parsedAmount;
		}
	}

    onSearchCourse() {
        console.log(this.listTrainings);
    }

	filterPriceUnder() {
		this.min = (Number)((<HTMLInputElement>document.getElementById("priceMin")).value);
		if (this.min < 0 || this.min > this.max) {
			return
		}

		let items: HTMLCollection | undefined = (document.getElementById("course-grid"))?.children;
		this.listTrainings?.forEach((product: Training, i: number) => {
			if (items != undefined && items[i] instanceof HTMLTableRowElement) {
				if (product.price < this.min)
					items[i].style.display = "none";
				else
					items[i].style.display = "";
			}
		});
	}

	filterPriceAbove() {
		this.max = (Number)((<HTMLInputElement>document.getElementById("priceMax")).value);
		if (this.max <= 0 || this.max < this.min) {
			return;
		}

		let items: HTMLCollection | undefined = (document.getElementById("course-grid"))?.children;
		this.listTrainings?.forEach((product: Training, i: number) => {
			if (items != undefined && items[i] instanceof HTMLTableRowElement) {
				if (product.price > this.max)
					items[i].style.display = "none";
				else
					items[i].style.display = "";
			}
		});
	}

	getHighest() {
		let prices: number[] | undefined = this.listTrainings?.map((course: Training) => +course.price);
		if (prices != null) {
			return Math.max(...prices);
		}
		return 0;
	}
}
