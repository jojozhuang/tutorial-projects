import { Component, OnInit } from "@angular/core";
import { OnlineJudgeService } from "./../../services";

@Component({
  selector: "app-algorithm-questions",
  templateUrl: "./algorithm-questions.component.html"
})
export class AlgorithmQuestionsComponent implements OnInit {
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
