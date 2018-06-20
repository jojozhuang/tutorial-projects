import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AlertService,
  AuthenticationService,
  TokenPayload
} from "../../services/";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  credentials: TokenPayload = {
    email: "",
    username: "",
    password: ""
  };

  signupForm: FormGroup;
  loading = false;
  submitted = false;
  status: number;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  isFieldValid(field: string) {
    return (
      (!this.signupForm.get(field).valid &&
        this.signupForm.get(field).touched) ||
      (this.signupForm.get(field).untouched && this.submitted)
    );
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field)
    };
  }

  onSubmit() {
    let user = this.signupForm.value;
    this.credentials.username = user.username;
    this.credentials.password = user.password;
    this.credentials.email = user.email;
    this.authService.signup(this.credentials).subscribe(
      () => {
        this.router.navigate(["/profile"]);
      },
      err => {
        console.error(err);
      }
    );

    /*
    this.submitted = true;

    if (this.signupForm.invalid) {
      return; //Validation failed, exit from method.
    }

    let user = this.signupForm.value;

    this.loading = true;
    this.authService.signup(user).subscribe(
      status => {
        //this.status = status;
        this.alertService.success("Registration successful!", true);
        this.router.navigate(["/login"]);
      },
      error => {
        //this.status = error.status;
        console.log("error");
        //console.log(error);
        //this.alertService.error(error);
        //this.message = error.message;
        this.loading = false;
      }
    );*/
  }
}
