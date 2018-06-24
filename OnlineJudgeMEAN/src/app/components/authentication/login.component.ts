import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenPayload } from "../../models";
import { AlertService, AuthenticationService } from "../../services/";
import { CookieUtil, AuthUtil } from "../../utils";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    username: "",
    password: "",
    remember: false
  };

  loginForm: FormGroup;
  loading = false;
  submitted = false;
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
      password: [null, Validators.required],
      remember: [null, []]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    // auto login with cookie
    const cookieToken = AuthUtil.getCookieToken();
    console.log(cookieToken);

    if (cookieToken) {
      this.authService.autologin().subscribe(
        () => {
          //this.alertService.success("Login successful!", true);
          console.log(document.cookie);
          this.router.navigate([this.returnUrl]);
        },
        err => {
          console.error(err);
          // reset login status
          this.authService.logout(false);
        }
      );
    } else {
      // reset login status
      this.authService.logout(false);
    }
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
    //CookieUtil.deleteAllCookies();
    this.submitted = true;

    if (this.loginForm.invalid) {
      return; //Validation failed, exit from method.
    }
    this.loading = true;
    let user = this.loginForm.value;
    this.credentials.username = user.username;
    this.credentials.password = user.password;
    this.credentials.remember = user.remember;

    console.log(this.credentials);
    console.log("Your Cookie : " + document.cookie);
    this.authService.login(this.credentials, user.remember).subscribe(
      response => {
        console.log("Your Cookie : " + document.cookie);
        this.alertService.success("Login successful!", true);
        this.router.navigate([this.returnUrl]);
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
      }
    );
  }
}
