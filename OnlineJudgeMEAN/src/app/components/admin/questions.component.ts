import { Component, OnInit } from "@angular/core";
import { AlertService, QuestionService } from "./../../services";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html"
})
export class QuestionsComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private questionService: QuestionService
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

  deleteQuestion(event) {
    if (window.confirm("Are you sure to delete this question?")) {
      //console.log(event.id);
      this.questionService.deleteQuestionById(event.id).subscribe(
        successCode => {
          this.alertService.success("Question has been deleted successfully.");
          this.getQuestions();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
