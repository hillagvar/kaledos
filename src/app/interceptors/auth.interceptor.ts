import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class authInterceptor implements HttpInterceptor {

  constructor (private authService: AuthService) {

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptorius paleistas');

    if (this.authService.auth != null) {

    
    let newReq = req.clone({

    //i requesta idedame nauja parametra
      params: req.params.append("auth", this.authService.auth.idToken)
    })

    //perduodame modifikuota requesta
    return next.handle(newReq);

  }

    //perduodame ne modifikuota requesta
    return next.handle(req);
  }

} 
