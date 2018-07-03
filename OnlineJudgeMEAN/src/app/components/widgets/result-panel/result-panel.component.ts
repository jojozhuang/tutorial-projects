import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-widget-result-panel",
  templateUrl: "./result-panel.component.html"
})
export class ResultPanelComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() testResult: number;
  @Input() resultMessage: string;

  close() {
    this.testResult = 0;
  }

  getInput() {
    if (this.resultMessage) {
      let strs = this.resultMessage.split(";");
      return strs[0];
    }
  }
  getYourAnswer() {
    if (this.resultMessage) {
      let strs = this.resultMessage.split(";");
      return strs[1];
    }
  }
  getExpectedAnswer() {
    if (this.resultMessage) {
      let strs = this.resultMessage.split(";");
      return strs[2];
    }
  }
}
