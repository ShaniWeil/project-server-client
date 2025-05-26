import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL: string = "https://localhost:7141/api/User";

  constructor(private httpClient: HttpClient) { }


  getAll(): Observable<User[]> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`);
    }
    return this.httpClient.get<User[]>(this.URL, { headers });
  }

  getById(id: string): Observable<User> {
    return this.httpClient.get<User>(`${this.URL}/user/id/${id}`);
  }

  getByNamePassword(name: string, password: string): Observable<User> {
    return this.httpClient.get<User>(`${this.URL}/user/name&password/${name},${password}`);
  }

  delete(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`);
    }
    return this.httpClient.delete<void>(`${this.URL}/${id}`, { headers });
  }

  add(user: User): Observable<void> {
    return this.httpClient.post<void>(this.URL, user);
  }

  update(id: string, user: User): Observable<void> {
    return this.httpClient.put<void>(`${this.URL}/${id}`, user);
  }

  userExists(id: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.URL}/exists/${id}`);
  }

}
