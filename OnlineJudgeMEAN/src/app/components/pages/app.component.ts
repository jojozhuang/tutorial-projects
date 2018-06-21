import { Component } from "@angular/core";
import { AuthenticationService } from "./../../services";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  title = "app";
  constructor(public auth: AuthenticationService) {}
}
