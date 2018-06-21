import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-validationmessage",
  templateUrl: "./validationmessage.component.html",
  styleUrls: ["./validationmessage.component.css"]
})
export class ValidationMessageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() errorMsg: string;
  @Input() displayError: boolean;
}
