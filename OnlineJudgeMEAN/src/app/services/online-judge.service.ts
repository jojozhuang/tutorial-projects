import { Injectable } from "@angular/core";
import {
  Http,
  Response,
  Headers,
  URLSearchParams,
  RequestOptions
} from "@angular/http";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";

import { Question } from "./../models";

@Injectable()
export class OnlineJudgeService {
  //URL for CRUD operations
  baseUrl = "http://localhost:5000/";
  apiUrl = this.baseUrl + "api/onlinejudge";

  //Create constructor to get Http instance
  constructor(private http: HttpClient) {}
  //Fetch all questions
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl + "/questions");
  }
}
