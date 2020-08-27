import { Injectable } from '@angular/core';

import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Tip } from '../models/Tip';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TipsService {

  private get: string = `${environment.api.url}${environment.api.tipsEndPoints.get}`;
  private getDetail: string = `${environment.api.url}${environment.api.tipsEndPoints.getDetail}`;
  private getDetailTipsUser: string = `${environment.api.url}${environment.api.tipsEndPoints.getTipsUser}`;
  private post: string = `${environment.api.url}${environment.api.tipsEndPoints.post}`;
  private put: string = `${environment.api.url}${environment.api.tipsEndPoints.put}`;
  private delete: string = `${environment.api.url}${environment.api.tipsEndPoints.delete}`;

  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.authenticationService.getToken()}`
    })
  }

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getTips(): Observable<Array<Tip>> {
    return this.http.get<Array<Tip>>(this.get);
  }

  getTip(id: string): Observable<Tip> {
    return this.http.get<Tip>(`${this.getDetail}${id}`, this.httpOptions);
  }

  getTipsUser(id: string): Observable<Array<Tip>> {
    return this.http.get<Array<Tip>>(`${this.getDetailTipsUser}${id}`, this.httpOptions);
  }

  createTip(tip: Tip): Observable<Tip> {
    return this.http.post<Tip>(this.post, tip, this.httpOptions);
  }

  editTip(title: string, description: string, id: string): Observable<Tip> {
    let body = {
      title: title,
      description: description
    };
    return this.http.put<Tip>(`${this.put}${id}`, body, this.httpOptions);
  }

  deleteTip(id: string): Observable<Tip> {
    return this.http.delete<Tip>(`${this.delete}${id}`, this.httpOptions);
  }
}

