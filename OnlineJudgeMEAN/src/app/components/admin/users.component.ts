import { Component, TemplateRef, OnInit } from "@angular/core";
import { AlertService, UserService } from "./../../services";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html"
})
export class UsersComponent implements OnInit {
  modalRef: BsModalRef;
  resetPWdModalRef: BsModalRef;
  users;
  id: string;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  openModal(template: TemplateRef<any>, id: string) {
    this.id = id;
    this.modalRef = this.modalService.show(template, { class: "modal-md" });
  }

  confirm(): void {
    this.userService.deleteUserById(this.id).subscribe(
      successCode => {
        this.alertService.success("User has been deleted successfully.");
        this.getUsers();
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

  openResetPWdModal(template: TemplateRef<any>, id: string) {
    this.id = id;
    this.resetPWdModalRef = this.modalService.show(template, {
      class: "modal-md"
    });
  }

  confirmResetPwd(): void {
    this.userService.resetPassword(this.id).subscribe(
      () => {
        this.alertService.success(
          "User's password has been reset successfully!"
        );
      },
      error => {
        console.log(error);
      }
    );
    this.resetPWdModalRef.hide();
  }

  declineResetPwd(): void {
    this.resetPWdModalRef.hide();
  }

  ngOnInit() {
    this.getUsers();
  }
  //Fetch all users
  getUsers() {
    this.userService.getUsers().subscribe(
      data => (this.users = data),
      error => {
        console.log(error);
      }
    );
  }
}
