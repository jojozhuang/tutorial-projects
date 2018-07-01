import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserDetails, TokenPayload } from "../../models";
import { Validators } from "@angular/forms";
import { AlertService, AuthenticationService } from "../../services/";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html"
})
export class ProfileComponent extends BaseComponent {
  _id;
  credentials: TokenPayload = {
    username: "",
    password: "",
    email: "",
    _id: ""
  };

  userDetails: UserDetails;

  ngOnInit() {
    // update, no need to check password
    this.baseForm = this.formBuilder.group({
      _id: [null, [Validators.required]],
      username: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]]
    });
    // get user from token
    this.userDetails = this.authService.getUserDetails();

    this.print(this.userDetails);

    this.baseForm.setValue({
      _id: this.userDetails._id,
      username: this.userDetails.username,
      email: this.userDetails.email
    });
  }

  onSubmit() {
    if (!this.validate()) {
      return;
    }

    this.loading = true;

    let user = this.baseForm.value;

    //Update user
    this.credentials._id = this.userDetails._id;
    this.credentials.username = user.username;
    this.credentials.email = user.email;

    this.print(this.credentials);

    this.authService.update(this.credentials, true).subscribe(
      () => {
        this.handleSuccess("profile");
      },
      error => {
        this.handleError(error);
      }
    );
  }
}
