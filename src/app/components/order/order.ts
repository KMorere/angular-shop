import { Component } from '@angular/core';
import { Order } from '../../model/Order';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../service/cart';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-order',
    imports: [ReactiveFormsModule],
    templateUrl: './order.html',
    styleUrl: './order.css',
})
export class OrderComponent {
    orderForm: FormGroup;

    constructor(private form: FormBuilder, private cart: CartService, private http: HttpClient) {
        this.orderForm = this.form.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
            mail: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmitOrder() {
        if (this.cart.cartContent == undefined) 
            return;

        let order: Order = new Order(
            0,
            this.orderForm.value.firstName,
            this.orderForm.value.lastName,
            this.orderForm.value.address,
            this.orderForm.value.phone,
            this.orderForm.value.mail,
            this.cart.getTotal(),
            this.cart.cartContent
        );
        console.log("Started order for : ", 
            order.firstName, order.lastName, 
            "For a total of: " + this.cart.getTotal(),
        order);

        this.saveOrder(order).subscribe({
            next: (data) => {
                console.log("Saved:", data),
                this.cart.cartContent = [];
            }
        });
    }

    saveOrder(order: Order): Observable<Order> {
        console.log("Saved order");
        return this.http.post<Order>("http://localhost:3000/orders/", order);
    }
}
