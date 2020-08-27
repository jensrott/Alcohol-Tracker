import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private login = `${environment.api.url}${environment.api.authEndPoints.login}`;
  private register = `${environment.api.url}${environment.api.authEndPoints.register}`;
  private getUser = `${environment.api.url}${environment.api.authEndPoints.user}`;
  private logout = `${environment.api.url}${environment.api.authEndPoints.logout}`;

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.getToken()}`
    })
  }

  constructor(
    private storage: Storage,
    private http: HttpClient
  ) { }

  onLogin(email, password): Observable<User> {
    let body = {
      email: email,
      password: password
    }
    return this.http.post<User>(this.login, body);
  }

  onRegister(name, email, password, password_confirmation): Observable<User> {
    let body = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
    return this.http.post<User>(this.register, body);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.getUser, this.httpOptions);
  }

  onLogout(): Observable<any> {
    // this.storage.remove('jwtToken');
    localStorage.removeItem('jwtToken');
    return this.http.post<any>(this.logout, "");
  }

  isAuthenticated(): Boolean {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      return true
    }
    return false;
  }

  getToken(): string {
    const token = localStorage.getItem('jwtToken');
    return token;
  }
}
