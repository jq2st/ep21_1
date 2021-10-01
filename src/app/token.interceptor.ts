import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = this.authService.getToken()
    if (userToken) {
        const modifiedReq = req.clone({ 
            headers: req.headers.set('Authorization', `Bearer ${userToken}`),
          })
        return next.handle(modifiedReq);
    }
    return next.handle(req.clone());
  }

}