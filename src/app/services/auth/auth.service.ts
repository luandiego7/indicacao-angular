import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLogged = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient, private router:Router) {}

  /*isLogged(){
      return localStorage.getItem('user') != null;
  }*/

  toggleLogin(state:boolean):void{
    this.isLogged.next(state);
  }

  status(){
    const localData:any = localStorage.getItem('user');
    if(!localData){
      this.isLogged.next(false);
      //console.log("Realize o login");
    }else{

      this.isLogged.next(true);

      /*const userObj          = JSON.parse(localData);
      const token_expires_at = new Date(userObj.expires_at);
      const current_date     = new Date();*/

      /*if(token_expires_at > current_date){
        this.isLogged.next(true);
      }else{
        this.isLogged.next(false);
        console.log('Token expirado');
      }*/
    }

    return this.isLogged.asObservable();
  }

  register(name:string, email:string, password:string, password_confirmation:string){
    const headers  = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    const data = {
      name,
      email,
      password,
      password_confirmation
    }
      return this.http.post(`${environment.base_url}/auth/register`, data, {headers});
  }

  login(email:string, password:string){
    const headers  = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    return this.http.post(`${environment.base_url}/auth/login`, {
      email,
      password
    }, {headers:headers});
  }

  logout(){
    const user:any = localStorage.getItem('user');
    const userObj  = JSON.parse(user);
    const headers  = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });

    this.http.post(`${environment.base_url}/auth/logout`, {token:userObj.token}, {headers:headers}).subscribe((res) =>{
      localStorage.removeItem('user');
      this.toggleLogin(false);
      this.router.navigate(['login']);
    }, error => {
      console.log(error);
    });
  }
}
