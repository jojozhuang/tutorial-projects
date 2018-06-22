import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { ResetPassword } from "../../models";
import { AlertService, AuthenticationService } from "../../services/";
import { matchOtherValidator } from "./match-other-validator";

@Component({
  selector: "app-resetpwd",
  templateUrl: "./resetpwd.component.html"
})
export class ResetpwdComponent implements OnInit {
  credentials: ResetPassword = {
    username: "",
    password: "",
    newpwd: "",
    confirmpwd: ""
  };

  resetpwdForm: FormGroup;
  passwords: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.resetpwdForm = this.formBuilder.group({
      password: [null, Validators.required],
      newpwd: [null, [Validators.required, Validators.minLength(6)]],
      confirmpwd: [null, [Validators.required, matchOtherValidator("newpwd")]]
    });
  }

  passwordConfirming(ac: AbstractControl): { invalid: boolean } {
    if (ac.get("newpwd").value !== ac.get("confirmpwd").value) {
      return { invalid: true };
    }
  }
  isFieldValid(field: string) {
    return (
      (!this.resetpwdForm.get(field).valid &&
        this.resetpwdForm.get(field).touched) ||
      (this.resetpwdForm.get(field).untouched && this.submitted)
    );
  }

  displayFieldCss(field: string) {
    return {
      "has-error": this.isFieldValid(field),
      "has-feedback": this.isFieldValid(field)
    };
  }

  onSubmit() {
    console.log("onsubmit");
    this.submitted = true;

    if (this.resetpwdForm.invalid) {
      console.log("validation failed");
      return; //Validation failed, exit from method.
    }
    this.loading = true;
    let user = this.resetpwdForm.value;
    this.credentials.username = this.authService.getUserDetails().username;
    this.credentials.password = user.password;
    this.credentials.newpwd = user.newpwd;
    this.credentials.confirmpwd = user.confirmpwd;

    this.authService.resetPassword(this.credentials).subscribe(
      () => {
        this.alertService.success("Password has been updated successful!");
        this.loading = false;
      },
      err => {
        console.error(err);
        this.loading = false;
      }
    );
  }
}
