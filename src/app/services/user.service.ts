import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private http: HttpClient) { }

  register(user :User){
    return this.http.post<any>(`http://conduit.productionready.io/api/users`,{"user": user});
  }

  getCurrentUser(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': "Token "+localStorage.jwtToken
       
      })
    };
    return this.http.get(`http://conduit.productionready.io/api/user`,httpOptions);
  }
}
