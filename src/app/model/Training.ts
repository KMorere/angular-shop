export class Training {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string

    constructor(id: string, name: string, description: string, price: number, quantity: number, image: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.image = image;
    }
};