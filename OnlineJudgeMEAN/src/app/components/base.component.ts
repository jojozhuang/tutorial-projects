import { Component, Injectable, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDetails, TokenPayload } from "../models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService, AuthenticationService } from "../services/";

@Injectable()
export abstract class BaseComponent implements OnInit {
  protected printLog = true;
  protected baseForm: FormGroup;
  protected loading = false;

  constructor(
    public authService: AuthenticationService,
    public formBuilder: FormBuilder,
    public alertService: AlertService,
    public route: ActivatedRoute
  ) {}

  isFieldValid(field: string) {
    //console.log(field);
    return !this.baseForm.get(field).valid;
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field)
    };
  }

  ngOnInit() {}

  validate() {
    if (this.baseForm.invalid) {
      return false; //Validation failed, exit from method.
    }

    return true;
  }

  handleSuccess(objName: string) {
    this.alertService.success(
      "Your profile has been updated successfully!",
      false
    );
    this.loading = false;
  }

  handleError(error: string) {
    console.error(error);
    this.loading = false;
  }

  print(message: any) {
    if (this.printLog) {
      console.log(message);
    }
  }
}
