import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService, UserService } from "../../services/";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  status: number;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
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

  //Handle create and update user
  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return; //Validation failed, exit from method.
    }

    let user = this.loginForm.value;

    this.loading = true;
    this.userService.createUser(user).subscribe(
      status => {
        this.status = status;
        this.alertService.success("Registration successful", true);
        this.router.navigate(["/login"]);
      },
      error => {
        this.status = error.status;
        this.alertService.error(error);
        this.message = error.message;
        this.loading = false;
      }
    );
  }
}
