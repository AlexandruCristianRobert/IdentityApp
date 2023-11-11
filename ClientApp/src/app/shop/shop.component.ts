import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  constructor(private shopService: ShopService){}
  message: string = '';

  ngOnInit(): void {
    this.shopService.getProducts().subscribe({
      next: (response: any) => this.message = response.value.message,
      error: error => console.log(error)
      
    })
  }

}
