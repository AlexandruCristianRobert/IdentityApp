import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Basket, Order, Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  basket: Basket | null = null;
  user: any;

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(`${environment.appUrl}/api/shop/get-products`)
  }

  addBasket(){
    return this.http.post(`${environment.appUrl}/api/shop/add-basket`, this.basket);
  }

  addProduct(product: Product){
    return this.http.post(`${environment.appUrl}/api/shop/add-product`, product);
  }

  emptyBasket(){
    return this.http.delete(`${environment.appUrl}/api/shop/empty-basket/${this.basket?.id}`)
  }

  addToBasket(product: Product){
    if(this.basket == null) return;

      const existingOrder = this.basket.orders.find(order => order.productId === product.id);

      if (existingOrder) {
        existingOrder.quantity += 1;
        existingOrder.price = existingOrder.quantity * existingOrder.product.price;
      } else {
        const newOrder = {
          id: 0,
          productId: product.id,
          product: product,
          quantity: 1,
          price: product.price * 1,
          basketId: this.basket.id,
        } as Order;

        this.basket.orders.push(newOrder);
      }

      this.basket.price += product.price;
      this.updateBasket().subscribe({
        next: _=>{}
      })
  }

  decrementFromBasket(product: Product){
    if(this.basket == null) return;

      const existingOrder = this.basket.orders.find(order => order.productId === product.id);

      if (existingOrder) {
        existingOrder.quantity -= 1;
        existingOrder.price = existingOrder.quantity * existingOrder.product.price;
        if(existingOrder.quantity >= 0)
        this.basket.price -= product.price;
      } 

  }


  setBasket(){
    const userString = localStorage.getItem(environment.userKey);

    if(userString){
      this.user = JSON.parse(userString)
      this.http.get(`${environment.appUrl}/api/shop/get-basket/${this.user.id}`).subscribe({
        next: (response: any) =>{
          this.basket = response
          return response;
        },
        error: error =>{
          this.basket = {
            id: 0, 
            price: 0,
            orders: [],
            userId: this.user.id
          } as Basket

          this.addBasket().subscribe({
            next: _=>this.http.get(`${environment.appUrl}/api/shop/get-basket/${this.user.id}`).subscribe({
              next: (response: any) => {
                this.basket = response;
                return response;
              }
            }),
            error: _=>{}
          })
        }
      }
      )
    }  
  }


  getBasket(){
    return this.http.get(`${environment.appUrl}/api/shop/get-basket/${this.user.id}`)
  }
  
  updateBasket(){
    return this.http.post(`${environment.appUrl}/api/shop/update-basket`, this.basket)
  }
}
