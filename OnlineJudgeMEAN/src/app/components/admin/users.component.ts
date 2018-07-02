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
  users;
  id_del: string;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private modalService: BsModalService
  ) {}

  openModal(template: TemplateRef<any>, id: string) {
    this.id_del = id;
    this.modalRef = this.modalService.show(template, { class: "modal-sm" });
  }

  confirm(): void {
    this.userService.deleteUserById(this.id_del).subscribe(
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
