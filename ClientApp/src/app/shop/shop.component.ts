import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  products: Product[] = [];
  constructor(private shopService: ShopService, private formBuilder: FormBuilder){}
  message: string = '';
  user: any;

  ngOnInit(): void {
    this.initializeForm()
    this.shopService.getProducts().subscribe({
      next: (response: any) => {
        this.products = response;
      },
      error: error => console.log(error)
      
    })
    this.shopService.setBasket()
    this.user = this.shopService.user;
    if(localStorage.getItem(environment.userKey) == null){
      this.user = null;
    }
  }

  addToBasket(product: Product){
    this.shopService.addToBasket(product);
  }

  initializeForm(){
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required]],
      productDescription: ['', [Validators.required]],
      productPrice: ['', [Validators.required]],
      productImgUrl: ['', [Validators.required]],
    })
  }

  addProduct(){
    if(this.productForm.valid){
      const productToAdd = {
        imgUrl: this.productForm.value.productImgUrl, 
        name: this.productForm.value.productName,
        description: this.productForm.value.productDescription,
        price: this.productForm.value.productPrice,
      };
      
      this.shopService.addProduct(productToAdd as Product).subscribe({
        next: _=> window.location.reload()
      })
    }
  }

}
