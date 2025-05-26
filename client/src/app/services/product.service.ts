import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL : string = "https://localhost:7141/api/ProductCotroller";

  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.URL);
  }

  getZeroStockQuantity() : Observable<Product[]>{
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders(); 
    if (token) {
        headers = headers.append("Authorization", `Bearer ${token}`); 
    }
    return this.httpClient.get<Product[]>(`${this.URL}/GetZeroStockQuantity`, { headers })
  }

  getById(id : number) : Observable<Product>{
    return this.httpClient.get<Product>(`${this.URL}/product/id/${id}`);
  }

  getByCategoryId(id : number) : Observable<Product>{
    return this.httpClient.get<Product>(`${this.URL}/product/category id/${id}`);
  }

  delete(id : number) : Observable<void>{
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders(); 
    if (token) {
        headers = headers.append("Authorization", `Bearer ${token}`); 
    }
    return this.httpClient.delete<void>(`${this.URL}/${id}`, { headers });
  }

  add(product : Product) : Observable<void>{
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders(); 
    if (token) {
        headers = headers.append("Authorization", `Bearer ${token}`); 
    }
    return this.httpClient.post<void>(this.URL, product, { headers });
  }

  update(id : number, product : Product) :  Observable<void>{
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders(); 
    if (token) {
        headers = headers.append("Authorization", `Bearer ${token}`); 
    }
    return this.httpClient.put<void>(`${this.URL}/${id}`, product, { headers });
  }

  updateQty(product : Product) :  Observable<void>{
    return this.httpClient.put<void>(`${this.URL}//product/postQTY`, product);
  }
  
}
 