import { Component, Injectable, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  QuestionService,
  UserService,
  AlertService,
  AuthenticationService
} from "../services/";

@Injectable()
export abstract class BaseComponent implements OnInit {
  protected logging = true;
  protected baseForm: FormGroup;
  protected loading = false;
  protected submitted = false;

  protected initialValidation = false;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public route: ActivatedRoute,
    public alertService: AlertService,
    public authService: AuthenticationService,
    public userService: UserService,
    public questionService: QuestionService
  ) {}

  isLoading() {
    return this.loading;
  }

  isFieldValid(field: string) {
    //console.log(field);
    if (!this.initialValidation) {
      return !this.baseForm.get(field).valid;
    } else {
      return (
        (!this.baseForm.get(field).valid && this.baseForm.get(field).touched) ||
        (this.baseForm.get(field).untouched && this.submitted)
      );
    }
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field)
    };
  }

  ngOnInit() {}

  validate() {
    this.submitted = true;
    if (this.baseForm.invalid) {
      return false; //Validation failed, exit from method.
    }

    this.loading = true;

    return true;
  }

  back(url) {
    this.router.navigate([url]);
  }

  handleSuccess(message: string, keep?: boolean, navURL?: string) {
    this.alertService.success(message, keep);
    if (navURL) {
      this.router.navigate([navURL]);
    }

    this.loading = false;
  }

  handleError(error: string) {
    console.error(error);
    this.loading = false;
  }

  printLog(message: any) {
    if (this.logging) {
      console.log(message);
    }
  }

  printError(message: any) {
    if (this.printLog) {
      console.error(message);
    }
  }
}
