import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }



  getProducts(){
    
    return this.http.get(`${environment.appUrl}/api/shop/get-products`)
  }
}
