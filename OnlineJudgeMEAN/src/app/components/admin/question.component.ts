import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { Validators } from "@angular/forms";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-question",
  templateUrl: "./question.component.html"
})
export class QuestionComponent extends BaseComponent {
  _id;

  /*  public selectedValue;
  public htmlContent;
  //public text;

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
  }*/

  onTitleChange(value) {
    if (value) {
      let words = value.split(" ");
      let name = "";
      for (let i = 0; i < words.length; i++) {
        name += words[i].toLowerCase();
        name += "-";
      }
      this.baseForm.get("uniquename").setValue(name.slice(0, name.length - 1));
    } else {
      this.baseForm.get("uniquename").setValue("");
    }
  }

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get("_id");
    if (this._id == null || this._id == "") {
      this.initialValidation = true;
      // create
      this.baseForm = this.formBuilder.group({
        sequence: [
          null,
          [
            Validators.required,
            Validators.pattern("[0-9]+"),
            Validators.min(0),
            Validators.max(2147483647)
          ]
        ],
        title: [null, [Validators.required, Validators.minLength(5)]],
        uniquename: [null, [Validators.required]],
        description: [null, [Validators.required]],
        mainfunction: [null, [Validators.required]],
        difficulty: [10, [Validators.required]],
        frequency: [
          null,
          [
            Validators.required,
            Validators.pattern("[0-9]+"),
            Validators.min(0),
            Validators.max(100)
          ]
        ],
        rating: [
          0,
          [
            Validators.required,
            Validators.pattern("[0-9]+"),
            Validators.min(0),
            Validators.max(5)
          ]
        ]
      });
      //this.selectedValue = 10;
      //this.htmlContent = "";
      //this.codecontent = "";
    } else {
      this.baseForm = this.formBuilder.group({
        _id: [{ value: "", disabled: true }],
        sequence: [],
        title: [],
        uniquename: [],
        description: [],
        mainfunction: [],
        difficulty: [],
        frequency: [],
        rating: []
      });

      this.questionService.getQuestionById(this._id).subscribe(
        question => {
          this.baseForm = this.formBuilder.group({
            _id: [question._id, [Validators.required]],
            sequence: [
              question.sequence,
              [
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.min(0),
                Validators.max(2147483647)
              ]
            ],
            title: [
              question.title,
              [Validators.required, Validators.minLength(5)]
            ],
            uniquename: [question.uniquename, [Validators.required]],
            description: [question.description, [Validators.required]],
            mainfunction: [question.mainfunction, [Validators.required]],
            difficulty: [question.difficulty, [Validators.required]],
            frequency: [
              question.frequency,
              [
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.min(0),
                Validators.max(100)
              ]
            ],
            rating: [
              question.rating,
              [
                Validators.required,
                Validators.pattern("[0-9]+"),
                Validators.min(0),
                Validators.max(5)
              ]
            ]
          });
          //this.selectedValue = question.difficulty;
          //this.htmlContent = question.description;
          //this.codecontent = question.mainfunction;
        },
        error => {
          this.printError(error);
        }
      );
    }
  }

  //Handle create and update question
  onSubmit() {
    if (!this.validate()) {
      return;
    }

    let question = this.baseForm.value;
    this.printLog(question);

    if (question._id == null || question._id == "") {
      //Create question
      question._id = "";
      this.questionService.createQuestion(question).subscribe(
        () => {
          this.handleSuccess(
            "Question has been created successfully.",
            true,
            "/admin/questions"
          );
        },
        error => {
          this.handleError(error);
        }
      );
    } else {
      //Update question
      this.questionService.updateQuestion(question).subscribe(
        () => {
          this.handleSuccess(
            "Question has been updated successfully.",
            true,
            "/admin/questions"
          );
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }
}
