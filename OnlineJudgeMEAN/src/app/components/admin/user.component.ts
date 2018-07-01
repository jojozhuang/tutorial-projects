import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { TokenPayload } from "../../models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertService, AuthenticationService } from "../../services/";

import { UserService } from "./../../services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {
  _id;
  credentials: TokenPayload = {
    username: "",
    password: "",
    email: "",
    _id: ""
  };

  userForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get("_id");
    if (this._id == null || this._id == "") {
      // create
      this.userForm = this.formBuilder.group({
        username: [null, [Validators.required, Validators.minLength(3)]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        email: [null, [Validators.required, Validators.email]]
      });
    } else {
      // update, no need to check password
      this.userForm = this.formBuilder.group({
        _id: [null, [Validators.required]],
        username: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]]
      });
    }

    if (this._id != null) {
      this.userService.getUserById(this._id).subscribe(
        user => {
          //console.log(user);
          this.userForm.setValue({
            _id: user._id,
            username: user.username,
            email: user.email
          });
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  isFieldValid(field: string) {
    //console.log(field);
    return (
      (!this.userForm.get(field).valid && this.userForm.get(field).touched) ||
      (this.userForm.get(field).untouched && this.submitted)
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

    if (this.userForm.invalid) {
      return; //Validation failed, exit from method.
    }

    this.loading = true;

    let user = this.userForm.value;
    //console.log(user);
    if (user._id == null || user._id == "") {
      //Create user
      this.credentials._id = "";
      this.credentials.username = user.username;
      this.credentials.password = user.password;
      this.credentials.email = user.email;
      this.authService.signup(this.credentials, false).subscribe(
        () => {
          this.alertService.success(
            "User has been created successfully!",
            true
          );
          this.router.navigate(["/admin/userlist"]);
        },
        error => {
          console.error(error);
          this.loading = false;
        }
      );
    } else {
      //Update user
      this.credentials._id = this._id;
      this.credentials.username = user.username;
      this.credentials.email = user.email;
      this.authService.update(this.credentials, false).subscribe(
        () => {
          this.alertService.success(
            "User has been updated successfully!",
            true
          );
          this.router.navigate(["/admin/userlist"]);
        },
        error => {
          console.error(error);
          this.loading = false;
        }
      );
    }
  }

  back(url) {
    this.router.navigate([url]);
  }
}
