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

import { Question, Submission } from "./../models";

@Injectable()
export class OnlineJudgeService {
  baseUrl = "http://localhost:5000/";
  apiUrl = this.baseUrl + "api/onlinejudge";

  //Create constructor to get Http instance
  constructor(private http: HttpClient) {}
  //Fetch all questions
  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiUrl + "/questions");
  }
  //Fetch question by unique name
  getQuestionByUniqueName(uniquename: string): Observable<Question> {
    return this.http.get<Question>(this.apiUrl + "/question/" + uniquename);
  }

  //Create submission
  createSubmission(submission: Submission): Observable<any> {
    return this.http
      .post<Submission>(this.apiUrl, submission, {
        observe: "response"
      })
      .map(res => res.body);
  }

  //Fetch submission by names
  getSubmissionByNames(
    username: string,
    questionname: string
  ): Observable<Submission> {
    return this.http.get<Submission>(
      this.apiUrl + "/" + username + "," + questionname
    );
  }
  /*
  //Update submission
  updateSubmission(submission: Submission): Observable<any> {
    return this.http
      .put(
        this.apiUrl + "/" + submission.username + "," + submission.questionname,
        submission,
        { observe: "response" }
      )
      .map(res => res.status);
  }
*/

  //Update submission
  updateSubmission(submission: Submission): Observable<any> {
    return this.http
      .put<Submission>(this.apiUrl + "/" + submission._id, submission, {
        observe: "response"
      })
      .map(res => res.body);
  }

  //Submit solution
  submitSolution(submission: Submission): Observable<any> {
    return this.http.post(this.apiUrl + "/run", submission);
  }
}
