import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'app/_models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3001/users';

  constructor(private http: HttpClient) { }

  // createUser(user: User): Observable<User> {
  //   return this.http.post<User>(`${this.apiUrl}`, user);
  // }

  // getEmployee(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/employee`);
  // }

  // getVisitor(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/visitor`);
  // }

  // getUnknown(): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.apiUrl}/unknowns`);
  // }



  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  //   getUser(id: string): Observable<User> {
  //     return this.http.get<User>(`${this.apiUrl}/${id}`);
  //   }

  //   updateUser(id: string, user: Partial<User>): Observable<User> {
  //     return this.http.patch<User>(`${this.apiUrl}/${id}`, user);
  //   }

  //   deleteUser(id: string): Observable<void> {
  //     return this.http.delete<void>(`${this.apiUrl}/${id}`);
  //   }
}
