import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import TextUtils from "../../utils/TextUtils";
import { AlertService } from "../../services";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      console.log("message");
      //console.log(message);

      if (message) {
        var msg = "";
        var errors = message.text.errors;
        console.log("errors.length=" + errors.length);
        msg += "<ul>";
        for (var i = 0; i < errors.length; i++) {
          msg += "<li>" + errors[i].msg + "</li>";
        }
        msg += "</ul>";
        message.text = msg;
        this.message = message;
        console.log(this.message);
        /*
        if (TextUtils.isJson(message)) {
          console.log("is array");
          this.message = message.join();
        } else {
          this.message = message;
        }*/
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
