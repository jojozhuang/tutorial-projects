import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import {
  User,
  TokenPayload,
  TokenResponse,
  UserDetails,
  ResetPassword
} from "./../models";
import { AuthUtils } from "../utils";

@Injectable()
export class AuthenticationService {
  //URL for CRUD operations
  baseUrl = "http://localhost:5000/";
  //signupUrl = this.baseUrl + "api/authenticate/signup";
  //loginUrl = this.baseUrl + "api/authenticate/login";
  signupUrl = this.baseUrl + "api/authentication/signup";
  loginUrl = this.baseUrl + "api/authentication/login";

  constructor(private http: HttpClient, private router: Router) {}

  public getUserDetails(): UserDetails {
    let token = AuthUtils.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(
    type: "login" | "signup" | "update" | "resetpwd",
    user: TokenPayload,
    refresh: boolean
  ): Observable<any> {
    let base;

    base = this.http.post(this.baseUrl + `api/authentication/${type}`, user);

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (refresh && data.token) {
          AuthUtils.saveToken(data.token);
        }
        return data.token;
      })
    );

    return request;
  }

  public signup(user: TokenPayload, refresh: boolean): Observable<any> {
    return this.request("signup", user, refresh);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request("login", user, true);
  }

  public update(user: TokenPayload, refresh: boolean): Observable<any> {
    return this.request("update", user, refresh);
  }

  public resetPassword(user: ResetPassword): Observable<any> {
    return this.request("resetpwd", user, true);
  }

  public profile(): Observable<any> {
    return this.http.get(this.baseUrl + `api/profile/read`);
  }

  public logout(redirect?): void {
    AuthUtils.clearToken();
    if (redirect) {
      this.router.navigate(["/login"]);
    }
  }

  public getUserName() {}

  /*
  // Sign up
  signup(user: User): Observable<any> {
    return this.http
      .post(this.signupUrl, user, { observe: "response" })
      .map(res => res.status);
  }

  // Login
  login(username: string, password: string) {
    return this.http
      .post<any>(this.loginUrl, {
        username: username,
        password: password
      })
      .map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem("currentUser", JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem("currentUser");
  }*/
}
