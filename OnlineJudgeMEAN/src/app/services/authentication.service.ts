import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";

import { User, ResponseResult } from "./../models";

export interface UserDetails {
  _id: string;
  email: string;
  username: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  username?: string;
}

@Injectable()
export class AuthenticationService {
  private token: string;

  //URL for CRUD operations
  baseUrl = "http://localhost:5000/";
  //signupUrl = this.baseUrl + "api/authenticate/signup";
  //loginUrl = this.baseUrl + "api/authenticate/login";
  signupUrl = this.baseUrl + "api/signup";
  loginUrl = this.baseUrl + "api/login";

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem("onlinejudge-token", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("onlinejudge-token");
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
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
    method: "post" | "get",
    type: "login" | "signup" | "profile",
    user?: TokenPayload
  ): Observable<any> {
    let base;

    if (method === "post") {
      base = this.http.post(this.baseUrl + `api/${type}`, user);
    } else {
      base = this.http.get(this.baseUrl + `api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public signup(user: TokenPayload): Observable<any> {
    return this.request("post", "signup", user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request("post", "login", user);
  }

  public profile(): Observable<any> {
    return this.request("get", "profile");
  }

  public logout(): void {
    this.token = "";
    localStorage.removeItem("onlinejudge-token");
    this.router.navigate(["/login"]);
  }

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
