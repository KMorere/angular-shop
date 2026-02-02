import { Component } from '@angular/core';
import { Order } from '../../model/Order';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../service/cart';

@Component({
    selector: 'app-order',
    imports: [ReactiveFormsModule],
    templateUrl: './order.html',
    styleUrl: './order.css',
})
export class OrderComponent {
    orderForm: FormGroup;

    constructor(private form: FormBuilder, private cart: CartService) {
        this.orderForm = this.form.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            address: ['', Validators.required],
            phone: ['', Validators.required],
            mail: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmitOrder() {
        let order: Order = new Order(
            0,
            this.orderForm.value.firstName,
            this.orderForm.value.lastName,
            this.orderForm.value.address,
            this.orderForm.value.phone,
            this.orderForm.value.mail,
            this.cart.getTotal()
        );
        console.log("Started order for : ", 
            order.firstName, order.lastName, 
            "For a total of: " + this.cart.getTotal(),
        order);
    }
}
