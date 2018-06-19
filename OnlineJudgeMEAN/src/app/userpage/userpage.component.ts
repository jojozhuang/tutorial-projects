import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { UserService } from "./../user.service";

@Component({
  selector: "app-userpage",
  templateUrl: "./userpage.component.html",
  styleUrls: ["./userpage.component.css"]
})
export class UserpageComponent implements OnInit {
  status: number;
  message: string;
  _id;

  //Create form
  userForm = new FormGroup({
    _id: new FormControl(""),
    username: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    password: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    email: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(5)])
    )
  });

  constructor(
    private service: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get("_id");
    //console.log(this._id);
    if (this._id != null) {
      this.service.getUserById(this._id).subscribe(
        user => {
          //console.log(user);
          this.userForm.setValue({
            _id: user._id,
            username: user.username,
            password: user.password,
            email: user.email
          });
        },
        error => {
          this.status = error.status;
          this.message = error.message;
        }
      );
    }
  }

  //Handle create and update user
  onClickSubmit() {
    if (this.userForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    let user = this.userForm.value;
    //console.log(user);
    if (user._id == null || user._id == "") {
      //Create user
      user._id = "";
      this.service.createUser(user).subscribe(
        status => {
          this.status = status;
          this.router.navigate(["userlist"]);
        },
        error => {
          this.status = error.status;
          this.message = error.message;
        }
      );
    } else {
      //Update user
      this.service.updateUser(user).subscribe(
        status => {
          this.status = status;
          this.router.navigate(["userlist"]);
        },
        error => {
          this.status = error.statusCode;
          this.message = error.message;
        }
      );
    }
  }
}
