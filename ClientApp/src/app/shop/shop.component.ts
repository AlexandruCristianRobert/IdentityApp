import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products: Product[] = [];
  constructor(private shopService: ShopService){}
  message: string = '';

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response;
      },
      error: error => console.log(error)
      
    })

    this.shopService.setBasket()
  }

  addToBasket(product: Product){
    this.shopService.addToBasket(product);
  }

}
