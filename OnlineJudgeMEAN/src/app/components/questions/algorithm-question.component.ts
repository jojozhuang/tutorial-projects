import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Question, Submission } from "../../models";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-algorithm-question",
  templateUrl: "./algorithm-question.component.html"
})
export class AlgorithmQuestionComponent extends BaseComponent {
  editorConfig = {
    editable: false,
    spellcheck: false,
    height: "auto",
    minHeight: "5rem",
    width: "auto",
    minWidth: "0",
    translate: "no",
    enableToolbar: false,
    showToolbar: false,
    placeholder: "Enter text here...",
    imageEndPoint: "",
    toolbar: []
  };

  tab;
  _id;
  username;
  uniquename;
  selectedLang;
  submissions;
  testResult: number; // -1: not submitted, 10: pass, 20: fail
  resultMessage;
  //Create form
  baseForm = new FormGroup({
    language: new FormControl(
      "java",
      Validators.compose([Validators.required])
    ),
    solution1: new FormControl("", Validators.compose([Validators.required])),
    solution2: new FormControl("", Validators.compose([Validators.required])),
    solution3: new FormControl("", Validators.compose([Validators.required])),
    output: new FormControl("", null)
  });

  @Input() sequence: number;
  @Input() title: string;
  @Input() description: string;
  @Input() solution: string;
  @Input() hints: string;
  @Input()
  options = [
    {
      value: "java",
      name: "Java"
    },
    {
      value: "javascript",
      name: "JavaScript"
    },
    {
      value: "python",
      name: "Python"
    }
  ];

  @ViewChild("editor1") editor1;
  @ViewChild("editor2") editor2;
  @ViewChild("editor3") editor3;
  text1: string = "";
  text2: string = "";
  text3: string = "";

  ngAfterViewInit() {
    this.setEditors();
  }

  setEditors() {
    if (this.tab == "description") {
      //let editors: any[] = new Array(this.editor1, this.editor2, this.editor3);
      if (this.selectedLang == "java") {
        this.editor1.setTheme("eclipse");

        this.editor1.getEditor().setOptions({
          enableBasicAutocompletion: true
        });

        this.editor1.getEditor().commands.addCommand({
          name: "showOtherCompletions",
          bindKey: "Ctrl-.",
          exec: function(editor) {}
        });
      }

      // editor 2
      if (this.selectedLang == "javascript") {
        this.editor2.setTheme("eclipse");

        this.editor2.getEditor().setOptions({
          enableBasicAutocompletion: true
        });

        this.editor2.getEditor().commands.addCommand({
          name: "showOtherCompletions",
          bindKey: "Ctrl-.",
          exec: function(editor) {}
        });
      }

      // editor 3
      if (this.selectedLang == "python") {
        this.editor3.setTheme("eclipse");

        this.editor3.getEditor().setOptions({
          enableBasicAutocompletion: true
        });

        this.editor3.getEditor().commands.addCommand({
          name: "showOtherCompletions",
          bindKey: "Ctrl-.",
          exec: function(editor) {}
        });
      }
    }
  }

  onChange(language) {
    this.printLog(language);
    this.selectedLang = language;
    //this.setEditors();
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
          this.solution = question.solution;
          this.hints = question.hints;
          this.baseForm.setValue({
            language: "java",
            solution1: question.mainfunction,
            solution2: question.jsmain,
            solution3: question.pythonmain,
            output: ""
          });
          this.selectedLang = "java";
          // get submission
          if (this.uniquename) {
            this.sessionService
              .getSubmissionByNames(this.username, question.uniquename)
              .subscribe(
                submission => {
                  this.printLog(submission);
                  if (submission) {
                    this._id = submission._id;

                    if (submission.language == "java") {
                      this.baseForm.setValue({
                        language: submission.language,
                        solution1: submission.solution,
                        solution2: question.jsmain,
                        solution3: question.pythonmain,
                        output: ""
                        //status: submission.status
                      });
                    } else if (submission.language == "javascript") {
                      this.baseForm.setValue({
                        language: submission.language,
                        solution1: question.mainfunction,
                        solution2: submission.solution,
                        solution3: question.pythonmain,
                        output: ""
                        //status: submission.status
                      });
                    } else if (submission.language == "python") {
                      this.baseForm.setValue({
                        language: submission.language,
                        solution1: question.mainfunction,
                        solution2: question.jsmain,
                        solution3: submission.solution,
                        output: ""
                        //status: submission.status
                      });
                    }

                    this.selectedLang = submission.language;
                  }
                  this.setEditors();
                  this.asyncEnd();
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
