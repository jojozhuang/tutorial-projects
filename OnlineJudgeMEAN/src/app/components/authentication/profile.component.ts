import { Component, OnInit } from "@angular/core";
import { UserDetails } from "../../models";
import { AuthenticationService } from "../../services";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html"
})
export class ProfileComponent implements OnInit {
  details: UserDetails;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    this.authService.profile().subscribe(
      user => {
        this.details = user;
      },
      err => {
        console.error(err);
      }
    );
  }
}
