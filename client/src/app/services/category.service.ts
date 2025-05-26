import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  URL : string = "https://localhost:7141/api/Category";

  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.URL);
  }

  getById(id : number) : Observable<Category>{
    return this.httpClient.get<Category>(`${this.URL}/category/id/${id}`);
  }

  getByName(name : string) : Observable<Category>{
    return this.httpClient.get<Category>(`${this.URL}/category/name/${name}`);
  }

  delete(id : number) : Observable<void>{
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders(); 
    if (token) {
        headers = headers.append("Authorization", `Bearer ${token}`); 
    }
    return this.httpClient.delete<void>(`${this.URL}/${id}`, { headers });
  }

  add(category : Category) : Observable<void>{
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders(); 
    if (token) {
        headers = headers.append("Authorization", `Bearer ${token}`); 
    }
    return this.httpClient.post<void>(this.URL, category, { headers });
  }

  update(id : number, category : Category) :  Observable<void>{
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders(); 
    if (token) {
        headers = headers.append("Authorization", `Bearer ${token}`); 
    }
    return this.httpClient.put<void>(`${this.URL}/${id}`, category, { headers });
  }

}
