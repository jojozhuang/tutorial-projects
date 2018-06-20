import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  AlertService,
  AuthenticationService,
  TokenPayload
} from "../../services/";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: "",
    password: ""
  };

  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  isFieldValid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.submitted)
    );
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field)
    };
  }

  onSubmit() {
    let user = this.loginForm.value;
    this.credentials.username = user.username;
    this.credentials.password = user.password;

    this.authService.login(this.credentials).subscribe(
      () => {
        this.router.navigate(["/profile"]);
      },
      err => {
        console.error(err);
      }
    );

    /*
    this.submitted = true;

    if (this.loginForm.invalid) {
      return; //Validation failed, exit from method.
    }

    let user = this.loginForm.value;

    this.loading = true;
    this.authService.login(user.username, user.password).subscribe(
      status => {
        this.alertService.success("Login successful!", true);
        this.router.navigate(["/questionslist"]);
      },
      error => {
        this.loading = false;
      }
    );*/
  }
}
