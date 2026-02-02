import { Injectable, OnInit } from '@angular/core';
import { Training } from '../model/Training';

@Injectable({
  providedIn: 'root',
})
export class CartService {
	cartContent: Training[] | undefined = this.loadCart();
	constructor() { this.cartContent = this.loadCart(); }
	
    CART_KEY: string = "cart_products";

	loadCart(): Training[] {
		const cart: Training[] = []
		const loadedCart = localStorage.getItem(this.CART_KEY);
		if (loadedCart) {
			JSON.parse(loadedCart).forEach((course: string) => {
				let loadedCourse = this.getCourse(JSON.stringify(course));
				if (loadedCourse)
					cart.push(loadedCourse);
				return loadedCourse;
			});
		}
		return cart;
	}

	addCourse(course: Training) {
		this.cartContent = this.loadCart();
		const newCourse = this.cartContent?.find(val => (val.id === course.id));

		if (newCourse) {
			newCourse.quantity += course.quantity;
		} else {
			this.cartContent?.push(course);
		}

		/*for(let i: number = 0; i<course.quantity; i++) {
			this.cartContent?.push(course);
		}*/

		/*let cart: Training[] = [];
		let load = localStorage.getItem(this.CART_KEY);
		let loadArray: Training[] = [];
		
		if (load != null)
			loadArray = JSON.parse(load);

		if (loadArray !== null)
			cart = loadArray;
		cart.push(course);*/
		
		localStorage.setItem(this.CART_KEY, JSON.stringify(this.cartContent));
		if(newCourse)
			newCourse.quantity = 1;
	}

	getTotal():number {
		let total = 0;
		this.cartContent?.forEach((course: Training) => {
			total += course.price * course.quantity;
		});
		return total;
	}

    parseJSON<T>(jsonString: string): T | null {
        try {
            const parsed = JSON.parse(jsonString);
            return parsed as T;
        } catch (error) {
            console.error("Invalid JSON format:", error);
            return null;
        }
    }

    isValidCourse(obj: any): obj is Training {
        return (
            typeof obj.id === "number" &&
            typeof obj.name === "string" &&
            typeof obj.description === "string" &&
            typeof obj.price === "number" &&
            typeof obj.quantity === "number"
        );
    }

    getCourse(path: string): Training | null {
        try {
            const course = this.parseJSON<Training>(path);
            if (course && this.isValidCourse(course)) {
                return course;
            } else {
                console.error("JSON does not match the expected Course structure.");
                return null;
            }
        } catch (error) {
            console.error("Error reading file:", error);
            return null;
        }
    }
}
