import { Component, ViewChild, Input, OnInit } from "@angular/core";
import {
  AlertService,
  OnlineJudgeService,
  AuthenticationService
} from "./../../services";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Question, Submission } from "../../models";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html",
  styleUrls: ["./question.component.css"]
})
export class QuestionComponent implements OnInit {
  _id;
  username;
  uniquename;
  //Create form
  questionForm = new FormGroup({
    solution: new FormControl("", Validators.compose([Validators.required]))
  });

  @Input() sequence: number;
  @Input() title: string;
  @Input() description: string;

  @ViewChild("editor") editor;
  text: string = "";

  ngAfterViewInit() {
    this.editor.setTheme("eclipse");

    this.editor.getEditor().setOptions({
      enableBasicAutocompletion: true
    });

    this.editor.getEditor().commands.addCommand({
      name: "showOtherCompletions",
      bindKey: "Ctrl-.",
      exec: function(editor) {}
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private ojService: OnlineJudgeService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.uniquename = this.route.snapshot.paramMap.get("uniquename");
    this.username = this.authService.getUserName();
    //console.log(this._id);
    if (this.uniquename != null) {
      this.ojService.getQuestionByUniqueName(this.uniquename).subscribe(
        question => {
          console.log(question);
          this.sequence = question.sequence;
          this.title = question.title;
          this.description = question.description;
          this.questionForm.setValue({
            solution: question.mainfunction
          });
          // get submission
          this.ojService
            .getSubmissionByNames(this.username, question.uniquename)
            .subscribe(
              submission => {
                console.log(submission);
                if (submission) {
                  this._id = submission._id;
                  this.questionForm.setValue({
                    solution: submission.solution
                  });
                }
              },
              error => {
                console.log(error);
              }
            );
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  onSubmit() {
    if (this.questionForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    let question = this.questionForm.value;
    console.log(question);
    let submission = new Submission(
      this._id,
      this.username,
      this.uniquename,
      question.solution,
      -1
    );
    console.log(this._id);
    console.log(submission);
    if (this._id == null || this._id == "") {
      //Create question
      this.ojService.createSubmission(submission).subscribe(
        newsubmission => {
          console.log("created");
          console.log(newsubmission);
          this._id = newsubmission._id;
          console.log(this._id);
          this.alertService.success(
            "Your solution has been saved successfully.",
            true
          );
        },
        error => {
          console.log(error);
        }
      );
    } else {
      //Update question
      this.ojService.updateSubmission(submission).subscribe(
        updatedsubmission => {
          this._id = updatedsubmission._id;
          this.alertService.success(
            "Your solution has been updated successfully.",
            true
          );
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  back(url) {
    this.router.navigate([url]);
  }
}
