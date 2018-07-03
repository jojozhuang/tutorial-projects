import { Component, TemplateRef, OnInit } from "@angular/core";
import { AlertService, QuestionService } from "./../../services";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: "app-questions",
  templateUrl: "./questions.component.html"
})
export class QuestionsComponent implements OnInit {
  modalRef: BsModalRef;
  questions;
  id_del: string;

  constructor(
    private alertService: AlertService,
    private questionService: QuestionService,
    private modalService: BsModalService
  ) {}

  openModal(template: TemplateRef<any>, id: string) {
    this.id_del = id;
    this.modalRef = this.modalService.show(template, { class: "modal-md" });
  }

  confirm(): void {
    this.questionService.deleteQuestionById(this.id_del).subscribe(
      successCode => {
        this.alertService.success("Question has been deleted successfully.");
        this.getQuestions();
      },
      error => {
        console.log(error);
      }
    );
    this.modalRef.hide();
  }

  decline(): void {
    this.modalRef.hide();
  }

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
