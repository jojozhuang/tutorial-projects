import { Component, OnInit } from "@angular/core";
import { QuestionService } from "./../question.service";

@Component({
  selector: "app-questionlist",
  templateUrl: "./questionlist.component.html",
  styleUrls: ["./questionlist.component.css"]
})
export class QuestionlistComponent implements OnInit {
  constructor(private service: QuestionService) {}
  questions;
  status: number;
  message: string;

  ngOnInit() {
    this.getQuestions();
  }
  //Fetch all questions
  getQuestions() {
    this.service.getQuestions().subscribe(
      data => (this.questions = data),
      error => {
        this.status = error.status;
        this.message = error.message;
      }
    );
  }

  deleteQuestion(event) {
    if (window.confirm("Are you sure to delete this question?")) {
      //console.log(event.id);
      this.service.deleteQuestionById(event.id).subscribe(
        successCode => {
          this.status = successCode;
          this.getQuestions();
        },
        error => {
          this.status = error.status;
          this.message = error.message;
        }
      );
    }
  }
}
