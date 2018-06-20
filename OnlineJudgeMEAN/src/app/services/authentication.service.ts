import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { User, ResponseResult } from "./../models";

@Injectable()
export class AuthenticationService {
  //URL for CRUD operations
  baseUrl = "http://localhost:5000/";
  signupUrl = this.baseUrl + "api/authenticate/signup";
  loginUrl = this.baseUrl + "api/authenticate/login";

  constructor(private http: HttpClient) {}

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
  }
}
