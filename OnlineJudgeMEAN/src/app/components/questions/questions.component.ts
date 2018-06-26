import { Component, OnInit } from "@angular/core";
import { OnlineJudgeService } from "./../../services";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html",
  styleUrls: ["./questions.component.css"]
})
export class QuestionsComponent implements OnInit {
  constructor(private ojService: OnlineJudgeService) {}
  questions;

  ngOnInit() {
    console.log("questions");
    this.getQuestions();
  }

  //Fetch all questions
  getQuestions() {
    this.ojService.getQuestions().subscribe(
      data => {
        this.questions = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
