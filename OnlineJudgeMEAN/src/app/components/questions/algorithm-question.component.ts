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
  selector: "app-algorithm-question",
  templateUrl: "./algorithm-question.component.html"
})
export class AlgorithmQuestionComponent implements OnInit {
  _id;
  username;
  uniquename;
  selectedValue;
  //Create form
  questionForm = new FormGroup({
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
                console.log(submission);
                if (submission) {
                  this._id = submission._id;
                  this.questionForm.setValue({
                    language: submission.language,
                    solution: submission.solution,
                    output: ""
                    //status: submission.status
                  });
                }
                this.selectedValue = submission.language;
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

  back(url) {
    this.router.navigate([url]);
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
      question.language,
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
          this.router.navigate(["/questions"]);
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
          this.router.navigate(["/questions"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  onSubmitSolution() {
    console.log("onSubmitSolution");
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
      question.language,
      question.solution,
      -1
    );
    console.log(this._id);
    console.log(submission);
    //Create question
    this.ojService.submitSolution(submission).subscribe(
      response => {
        console.log(response);
        this.questionForm.setValue({
          language: submission.language,
          solution: submission.solution,
          output: response.message
          //status: submission.status
        });
        if (response.status === "0") {
          this.alertService.success(response.message);
        } else {
          this.alertService.error(response.message);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
