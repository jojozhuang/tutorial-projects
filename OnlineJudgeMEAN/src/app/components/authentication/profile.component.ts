import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDetails, TokenPayload } from "../../models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService, AuthenticationService } from "../../services/";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
  _id;
  credentials: TokenPayload = {
    username: "",
    password: "",
    email: "",
    _id: ""
  };

  profileForm: FormGroup;
  userDetails: UserDetails;
  loading = false;
  submitted = false;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // update, no need to check password
    this.profileForm = this.formBuilder.group({
      _id: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]]
    });
    // get user from token
    this.userDetails = this.authService.getUserDetails();
    //console.log(user);
    this.profileForm.setValue({
      _id: this.userDetails._id,
      username: this.userDetails.username,
      email: this.userDetails.email
    });
  }

  isFieldValid(field: string) {
    //console.log(field);
    return (
      (!this.profileForm.get(field).valid &&
        this.profileForm.get(field).touched) ||
      (this.profileForm.get(field).untouched && this.submitted)
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

    if (this.profileForm.invalid) {
      return; //Validation failed, exit from method.
    }

    this.loading = true;

    let user = this.profileForm.value;

    //Update user
    this.credentials._id = this.userDetails._id;
    this.credentials.username = user.username;
    this.credentials.email = user.email;
    console.log(this.credentials);
    this.authService.update(this.credentials, true).subscribe(
      () => {
        this.alertService.success(
          "Your profile has been updated successfully!",
          false
        );
        this.loading = false;
      },
      error => {
        console.error(error);
        this.loading = false;
      }
    );
  }
}
