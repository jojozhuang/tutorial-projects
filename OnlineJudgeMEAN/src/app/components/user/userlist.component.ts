import { Component, OnInit } from "@angular/core";
import { UserService } from "./../../services/user.service";

@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html"
})
export class UserlistComponent implements OnInit {
  constructor(private service: UserService) {}
  users;
  status: number;
  message: string;

  ngOnInit() {
    this.getUsers();
  }
  //Fetch all users
  getUsers() {
    this.service.getUsers().subscribe(
      data => (this.users = data),
      error => {
        this.status = error.status;
        this.message = error.message;
      }
    );
  }

  deleteUser(event) {
    if (window.confirm("Are you sure to delete this user?")) {
      //console.log(event.id);
      this.service.deleteUserById(event.id).subscribe(
        successCode => {
          this.status = successCode;
          this.getUsers();
        },
        error => {
          this.status = error.status;
          this.message = error.message;
        }
      );
    }
  }
}
