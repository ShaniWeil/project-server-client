import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../classes/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  URL = "https://localhost:7141/api/Order"

  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<Order[]>{
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders(); 
    if (token) {
        headers = headers.append("Authorization", `Bearer ${token}`); 
    }
    return this.httpClient.get<Order[]>(`${this.URL}/GetAll`, { headers });
  }

  getByUserId(id : string) : Observable<Order[]>{
    return this.httpClient.get<Order[]>(`${this.URL}/GetByUserId/id/${id}`);
  }

  getByDate(date: Date): Observable<Order[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders(); 
    if (token) {
        headers = headers.append("Authorization", `Bearer ${token}`); 
    }
    const formattedDate = date.toISOString();
    return this.httpClient.get<Order[]>(`${this.URL}/GetByDate/date/${formattedDate}`);
  }

  getById(id : number) : Observable<Order>{
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders(); 
    if (token) {
        headers = headers.append("Authorization", `Bearer ${token}`); 
    }
    return this.httpClient.get<Order>(`${this.URL}/order/id/${id}`);
  }

  add(order : Order) : Observable<void>{
    return this.httpClient.post<void>(this.URL, order);
  }

}
