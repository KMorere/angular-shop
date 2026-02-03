import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart';
import { Training } from '../../model/Training';
import { OrderComponent } from "../order/order";
import { Auth } from '../../service/auth';
import localeFr from '@angular/common/locales/fr';
import { CommonModule, CurrencyPipe, registerLocaleData } from '@angular/common';
registerLocaleData(localeFr);

@Component({
    selector: 'app-cart',
    imports: [OrderComponent, CommonModule, CurrencyPipe],
    templateUrl: './cart.html',
    styleUrl: './cart.css',
})
export class Cart implements OnInit {
    constructor(private cartService: CartService, public auth: Auth) { }

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
