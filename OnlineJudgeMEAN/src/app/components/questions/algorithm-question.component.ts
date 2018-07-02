import { Component, ViewChild, Input, OnInit } from "@angular/core";
import {
  AlertService,
  OnlineJudgeService,
  AuthenticationService
} from "./../../services";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Question, Submission } from "../../models";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-algorithm-question",
  templateUrl: "./algorithm-question.component.html"
})
export class AlgorithmQuestionComponent extends BaseComponent {
  _id;
  username;
  uniquename;
  selectedValue;
  //Create form
  baseForm = new FormGroup({
    language: new FormControl(
      "java",
      Validators.compose([Validators.required])
    ),
    solution: new FormControl("", Validators.compose([Validators.required])),
    output: new FormControl("", null)
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
          this.baseForm.setValue({
            language: "java",
            solution: question.mainfunction,
            output: ""
          });
          this.selectedValue = "java";
          // get submission
          this.ojService
            .getSubmissionByNames(this.username, question.uniquename)
            .subscribe(
              submission => {
                console.log("submission");
                console.log(submission);
                if (submission) {
                  this._id = submission._id;
                  this.baseForm.setValue({
                    language: submission.language,
                    solution: submission.solution,
                    output: ""
                    //status: submission.status
                  });
                  this.selectedValue = submission.language;
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
    if (!this.validate()) {
      return;
    }

    //Form is valid, now perform create or update
    let question = this.baseForm.value;
    this.printLog(question);
    let submission = new Submission(
      this._id,
      this.username,
      this.uniquename,
      question.language,
      question.solution,
      -1
    );
    this.printLog(this._id);
    this.printLog(submission);

    if (this._id == null || this._id == "") {
      //Create question
      this.ojService.createSubmission(submission).subscribe(
        newsubmission => {
          this._id = newsubmission._id;
          this.handleSuccess(
            "Your solution has been saved successfully.",
            true,
            "questions"
          );
        },
        error => {
          this.handleError(error);
        }
      );
    } else {
      //Update question
      this.ojService.updateSubmission(submission).subscribe(
        updatedsubmission => {
          this._id = updatedsubmission._id;
          this.handleSuccess(
            "Your solution has been updated successfully.",
            true,
            "questions"
          );
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }

  onSubmitSolution() {
    if (!this.validate2()) {
      return;
    }

    //Form is valid, now perform create or update
    let question = this.baseForm.value;
    this.printLog(question);
    let submission = new Submission(
      this._id,
      this.username,
      this.uniquename,
      question.language,
      question.solution,
      -1
    );
    this.printLog(this._id);
    this.printLog(submission);

    // Submit solution
    this.ojService.submitSolution(submission).subscribe(
      response => {
        this.printLog(response);
        this.baseForm.setValue({
          language: submission.language,
          solution: submission.solution,
          output: response.message
          //status: submission.status
        });
        if (response.status === "0") {
          this.handleSuccess2(response.message);
        } else {
          this.handleError2(response.message);
        }
      },
      error => {
        this.handleError2(error);
      }
    );
  }
}
