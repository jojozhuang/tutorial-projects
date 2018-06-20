import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { QuestionService } from "./../../services/question.service";

@Component({
  selector: "app-questionpage",
  templateUrl: "./questionpage.component.html",
  styleUrls: ["./questionpage.component.css"]
})
export class QuestionpageComponent implements OnInit {
  status: number;
  message: string;
  _id;

  //Create form
  questionForm = new FormGroup({
    _id: new FormControl(""),
    sequence: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.min(0),
        Validators.max(2147483647)
      ])
    ),
    title: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    description: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    difficulty: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(3)])
    )
  });

  constructor(
    private service: QuestionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get("_id");
    //console.log(this._id);
    if (this._id != null) {
      this.service.getQuestionById(this._id).subscribe(
        question => {
          //console.log(question);
          this.questionForm.setValue({
            _id: question._id,
            sequence: question.sequence,
            title: question.title,
            description: question.description,
            difficulty: question.difficulty
          });
        },
        error => {
          this.status = error.status;
          this.message = error.message;
        }
      );
    }
  }

  //Handle create and update question
  onClickSubmit() {
    if (this.questionForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    let question = this.questionForm.value;
    //console.log(question);
    if (question._id == null || question._id == "") {
      //Create question
      question._id = "";
      this.service.createQuestion(question).subscribe(
        status => {
          this.status = status;
          this.router.navigate(["questionlist"]);
        },
        error => {
          this.status = error.status;
          this.message = error.message;
        }
      );
    } else {
      //Update question
      this.service.updateQuestion(question).subscribe(
        status => {
          this.status = status;
          this.router.navigate(["questionlist"]);
        },
        error => {
          this.status = error.statusCode;
          this.message = error.message;
        }
      );
    }
  }
}
