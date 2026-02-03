export class Training {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;

    constructor(id: string, name: string, description: string, price: number, quantity: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
    }
};