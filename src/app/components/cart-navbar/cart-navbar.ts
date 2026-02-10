import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartService } from '../../service/cart';
import { Training } from '../../model/Training';

import localeFr from '@angular/common/locales/fr';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
registerLocaleData(localeFr);

@Component({
    selector: 'app-cart-navbar',
    imports: [RouterLink, CurrencyPipe],
    templateUrl: './cart-navbar.html',
    styleUrl: './cart-navbar.css',
})
export class CartNavbar {
    constructor(public cartService: CartService) { }

    cart: Set<Training> | undefined;

    ngOnInit(): void {
        let courses: Training[] | undefined = [];
        courses = this.cartService.cartContent;
        this.cart = new Set(courses);
    }

    getTotal(): number {
        return this.cartService.getTotal();
    }

    deleteCourse(course: Training) {
        this.cartService.cartContent = this.cartService.cartContent?.filter(item => item !== course);
        this.cart?.delete(course);

        localStorage.removeItem(this.cartService.CART_KEY);
        localStorage.setItem(this.cartService.CART_KEY, JSON.stringify(this.cartService.cartContent));
    }
}
