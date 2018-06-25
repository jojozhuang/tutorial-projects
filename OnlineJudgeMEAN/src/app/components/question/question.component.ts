import { Component, OnInit } from "@angular/core";
import { AlertService, OnlineJudgeService } from "./../../services";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private questionService: OnlineJudgeService
  ) {}
  questions;

  ngOnInit() {
    this.getQuestions();
  }
  //Fetch all questions
  getQuestions() {
    this.questionService.getQuestions().subscribe(
      data => {
        this.questions = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
