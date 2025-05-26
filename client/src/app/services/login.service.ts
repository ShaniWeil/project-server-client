import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   URL : string = "https://localhost:7141/api/Login";
  
    constructor(private httpClient : HttpClient) { }


     login(user: User): Observable<{ token: string }> {
      return this.httpClient.post<{ token: string }>(this.URL, user);
  } 
}
