import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api:string = 'http://localhost:3000/api';
  users: User[] = [];
  constructor(
    private _http: HttpClient
  ) { }


  postSignUp(form: User){
    this._http.post(`${this.api}/auth/signup`, form)
    .subscribe(d=>{
      console.log('from service');
      
      console.log(d);
      
    })
  }

  postLogin(form: User){
    this._http.post(`${this.api}/auth/login`, form)
    .subscribe(d=>{
      console.log('from service');
      
      console.log(d);
      
    })
  }

  getChecks(){
    this._http.get(`${this.api}/checks`).subscribe(d=>{

      console.log(d);
      
    })

  }
}
