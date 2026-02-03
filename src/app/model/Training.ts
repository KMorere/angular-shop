export class Training {
    id: string;
    name: string;
    description: string;
    price: string;
    quantity: string;

    constructor(id: string, name: string, description: string, price: string, quantity: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
};