import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Question, Submission } from "../../models";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-algorithm-question",
  templateUrl: "./algorithm-question.component.html"
})
export class AlgorithmQuestionComponent extends BaseComponent {
  tab;
  _id;
  username;
  uniquename;
  selectedValue;
  submissions;
  testResult: number; // -1: not submitted, 10: pass, 20: fail
  resultMessage;
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
  @Input() hints: string;

  @ViewChild("editor") editor;
  text: string = "";

  ngAfterViewInit() {
    if (this.tab == "description") {
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
  }

  changeTab(tab) {
    this.tab = tab;
    if (this.tab === "submissions") {
      this.asyncBegin();
      this.sessionService
        .getSubmissions(this.username, this.uniquename)
        .subscribe(
          data => {
            this.submissions = data;
            this.asyncEnd();
          },
          error => {
            this.handleError(error);
          }
        );
    }
  }

  ngOnInit() {
    this.tab = "description";
    this.testResult = -1;
    this.uniquename = this.route.snapshot.paramMap.get("uniquename");
    this.username = this.authService.getUserName();
    //console.log(this._id);
    if (this.uniquename != null) {
      this.asyncBegin();
      this.sessionService.getQuestionByUniqueName(this.uniquename).subscribe(
        question => {
          this.printLog(question);
          this.sequence = question.sequence;
          this.title = question.title;
          this.description = question.description;
          this.hints = question.hints;
          this.baseForm.setValue({
            language: "java",
            solution: question.mainfunction,
            output: ""
          });
          this.selectedValue = "java";
          // get submission
          if (this.uniquename) {
            this.sessionService
              .getSubmissionByNames(this.username, question.uniquename)
              .subscribe(
                submission => {
                  this.printLog(submission);
                  if (submission) {
                    this._id = submission._id;
                    this.baseForm.setValue({
                      language: submission.language,
                      solution: submission.solution,
                      output: ""
                      //status: submission.status
                    });
                    this.selectedValue = submission.language;
                    this.asyncEnd();
                  }
                },
                error => {
                  this.handleError(error);
                }
              );
          } else {
            this.asyncEnd();
          }
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }

  onSave() {
    this.testResult = -1;
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
      0,
      new Date(),
      null,
      0
    );
    this.printLog(this._id);
    this.printLog(submission);

    if (this._id == null || this._id == "") {
      //Create question
      this.sessionService.createSubmission(submission).subscribe(
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
      this.sessionService.updateSubmission(submission).subscribe(
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
    this.testResult = -1;
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
      0,
      new Date(),
      null,
      0
    );
    this.printLog(this._id);
    this.printLog(submission);

    // Submit solution
    this.sessionService.submitSolution(submission).subscribe(
      response => {
        this.printLog(response);
        this.baseForm.setValue({
          language: submission.language,
          solution: submission.solution,
          output: response.message
          //status: submission.status
        });
        if (response.status === "10") {
          this.handleSuccess2(response.message);
          this.testResult = 10;
          this.resultMessage = response.message;
        } else {
          this.handleError2(response.message);
          this.testResult = 20;
          this.resultMessage = response.message;
        }
      },
      error => {
        this.handleError2(error);
      }
    );
  }
}
