import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<any>(`${environment.apiUrl}/Users`);
  }

  getUser(user: User): Observable<User> {
    return this.http.get<any>(`${environment.apiUrl}/User/${user.id}`);
  }

  addUser(user: User): Observable<any> {
    const userDTO: User = Object.assign(user, {
      createD_AT: new Date().toISOString(),
    });
    return this.http.post<any>(`${environment.apiUrl}/Users`, {
      ...userDTO,
    });
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/User/${user.id}`, {
      ...user,
    });
  }

  deleteUser(user: User): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');

    return this.http.delete(`${environment.apiUrl}/Users/${user.id}`, { headers, responseType: 'text' as const });
  }
}
