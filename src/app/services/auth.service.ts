import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { AuthResponseData } from '../models/authResponseData';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public auth: AuthResponseData | null = null;
  public isLoggedIn = false;
  public onUserStatusChange = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) { 

  }

  public register(email:string, password:string, newUser:boolean){
    const method=(newUser)?'signUp':'signInWithPassword';
    
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:'+method+'?key=AIzaSyAPc18moYlwr0hUi_pI62e8wI1H87u3WYM',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(tap( (response)=>{
      this.auth=response;
      this.isLoggedIn=true;
      this.onUserStatusChange.emit(true);
    }));
  }

  public logout(){
    this.isLoggedIn=false;
    this.auth=null;
    this.onUserStatusChange.emit(false);
    this.router.navigate(['/']);
  }

  
  }


