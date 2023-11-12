import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit{

  constructor(private shopService: ShopService) {}
  ngOnInit(): void {
    this.shopService.emptyBasket().subscribe();
  }
  
}
