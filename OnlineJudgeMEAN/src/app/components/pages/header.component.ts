import { Component, OnInit } from "@angular/core";
import { UserDetails } from "../../models";
import { AuthenticationService } from "../../services";
import { AuthUtils } from "../../utils";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html"
})
export class HeaderComponent implements OnInit {
  //  details: UserDetails;

  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    //this.details = this.auth.getUserDetails();
    //this.isLoggedIn = AuthUtils.isLoggedIn();
    /*
    this.auth.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    );*/
  }
}
