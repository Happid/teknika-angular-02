import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor{
  // interceptor akan automatis mengimplementasikan ke seluruh services 
  constructor(private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'Token 12345';
    if(!token){
      this.router.navigate(['/dashboard']);
    }
    
    const newReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
    return next.handle(newReq);
  }

}