import { Injectable } from "@angular/core";

import { API_SIGNUP, API_LOGIN, API_AUTH } from "../utils/api.util";
import { HttpClient } from "@angular/common/http";
import { User } from "../interfaces/user.interface";
import { Observable, Subject } from "rxjs";
import { APIResponse } from "../interfaces/api.interface";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user: User = null;
  private userObserver = new Subject<boolean>();

  constructor(private httpClient: HttpClient, private router: Router) {}

  setUser(user: User) {
    this.user = user;
    localStorage.setItem("token", user.token);
    localStorage.setItem("expiresIn", user.expiresIn);
    this.userObserver.next(true);
  }

  getUser(): User {
    return this.user;
  }

  getUserObserver(): Observable<boolean> {
    return this.userObserver.asObservable();
  }

  getUserToken(): string {
    let expiresIn = new Date(localStorage.getItem("expiresIn")).getTime();
    if (expiresIn > Date.now()) return localStorage.getItem("token");
    else return "";
  }

  signup(user: User): Observable<APIResponse> {
    return this.httpClient.post(API_SIGNUP, user);
  }

  login(user: User): Observable<APIResponse> {
    return this.httpClient.post(API_LOGIN, user);
  }

  logout(): boolean {
    localStorage.clear();
    this.user = null;
    this.userObserver.next(false);
    return true;
  }
}
