import { User } from "./user";

export interface Product{
    id: number;
    name: string;
    imgUrl: string;
    price: number;
    description: string;
}


export interface Order{
    id: number;
    productId: number;
    product: Product;
    quantity: number;
    price: number;
    basketId: number;
}

export interface Basket{
    id: number;
    userId: string;
    price: number;
    orders: Array<Order>;
}