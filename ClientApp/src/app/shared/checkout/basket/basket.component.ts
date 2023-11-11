import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';
import { Basket, Product } from '../../models/product';
import {Location} from '@angular/common';
import {loadStripe} from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent implements OnInit {

  basket: Basket | null = null;
  constructor(private shopService: ShopService, private location: Location, private http: HttpClient){}
  message: string = '';
  decoded: any;
  check: boolean = false;



  ngOnInit(): void {
    this.shopService.setBasket()

    this.basket = this.shopService.basket;

    this.shopService.getBasket().subscribe({
      next: (response: any) => {
        this.basket = response
      }
    })
  }

  increment(product: Product){
    this.shopService.addToBasket(product);
    this.shopService.getBasket().subscribe({
      next: (response: any) => {
        this.basket = response
      }
    })
      
  }

  decrement(product: Product){
    this.shopService.decrementFromBasket(product);
    
    this.shopService.updateBasket().subscribe({
      next: _=>{
        this.basket = this.shopService.basket;
      }
    })    
  }

  clearBasket(){
    this.shopService.emptyBasket().subscribe({
      next: _=>{
        window.location.reload();
      }
    })
  }


  onCheckout(): void {
    this.check = true;
    this.http.post(`${environment.appUrl}/api/stripe/checkout`, this.basket).subscribe(async (res:  any) => {
      let stripe = await loadStripe("pk_test_51O5mO7EIxQnE3jupmUNa9mhyk0ga2GyjaeB0XQgijOnexONVngmrRqsEeeLJd48lcsobD7v8Ysa3P8ZnAtuogIVt00y7vIy8wq");
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }


}
