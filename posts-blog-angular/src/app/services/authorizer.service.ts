import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from "@angular/common/http";
import { Observable } from "rxjs";
import { API_LOGIN, API_SIGNUP } from "../utils/api.util";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthorizerService implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url !== API_SIGNUP && req.url !== API_LOGIN) {
      return next.handle(
        req.clone({
          headers: new HttpHeaders({
            Authorization: this.auth.getUserToken()
          })
        })
      );
    }
    return next.handle(req);
  }
}
