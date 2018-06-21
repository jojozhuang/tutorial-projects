import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenPayload } from "../../models";
import { AlertService, AuthenticationService } from "../../services/";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    username: "",
    password: ""
  };

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  status: number;
  message: string;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
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
    this.submitted = true;

    if (this.loginForm.invalid) {
      return; //Validation failed, exit from method.
    }
    this.loading = true;
    let user = this.loginForm.value;
    this.credentials.username = user.username;
    this.credentials.password = user.password;

    this.authService.login(this.credentials).subscribe(
      () => {
        this.alertService.success("Login successful!", true);
        this.router.navigate([this.returnUrl]);
      },
      err => {
        console.error(err);
        this.loading = false;
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
