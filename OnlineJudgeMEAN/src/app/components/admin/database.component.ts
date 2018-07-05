import {
  Component,
  TemplateRef,
  Input,
  ViewChild,
  OnInit
} from "@angular/core";
import { AlertService, DatabaseService } from "./../../services";
import { FormGroup, FormBuilder } from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

@Component({
  selector: "app-database",
  templateUrl: "./database.component.html"
})
export class DatabaseComponent implements OnInit {
  modalRef: BsModalRef;
  uploadForm: FormGroup;
  selectedValue: string;
  collection: string;
  users;
  questions;
  submissions;

  constructor(
    public formBuilder: FormBuilder,
    private databaseSerivce: DatabaseService,
    private alertService: AlertService,
    private modalService: BsModalService
  ) {}

  @Input() options = [];
  @ViewChild("fileupd") fileupd;

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      fileupd: []
    });
    this.databaseSerivce.getCollections().subscribe(
      collections => {
        let list = [{ value: "0", name: "--No Selection--" }];
        let names = collections.map(val => ({
          value: val.name,
          name: val.name
        }));
        this.options = list.concat(names);
        this.selectedValue = "0";
      },
      error => {
        console.log(error);
      }
    );
  }

  onChange(collection) {
    this.collection = collection;
    console.log(collection);
    this.getData();
  }

  getData() {
    if (this.collection == "users") {
      this.databaseSerivce.getUsers(this.collection).subscribe(
        data => (this.users = data),
        error => {
          console.log(error);
        }
      );
    } else if (this.collection == "questions") {
      this.databaseSerivce.getUsers(this.collection).subscribe(
        data => (this.questions = data),
        error => {
          console.log(error);
        }
      );
    } else if (this.collection == "submissions") {
      this.databaseSerivce.getUsers(this.collection).subscribe(
        data => (this.submissions = data),
        error => {
          console.log(error);
        }
      );
    }
  }

  exportCSV() {
    this.databaseSerivce.exportData(this.collection);
  }

  hasData() {
    if (
      this.collection == "users" ||
      this.collection == "questions" ||
      this.collection == "submissions"
    ) {
      return true;
    } else {
      return false;
    }
  }

  // upload dialog
  openModal(template: TemplateRef<any>, id: string) {
    this.modalRef = this.modalService.show(template, { class: "modal-md" });
  }
  choose() {
    var filectrl = <HTMLInputElement>document.getElementById("upload");
    //console.log(filectrl);
    filectrl.value = "";
    filectrl.click();
  }
  loading: boolean = false;
  confirm(): void {
    console.log(this.fileToUpload);
    if (!this.fileToUpload) {
      alert("Please select file to import data.");
      return;
    }
    this.loading = true;
    const formData = new FormData();
    // 'fileitem' must match with the backen api
    formData.append("fileitem", this.fileToUpload, this.fileToUpload.name); // file
    formData.append("name", this.collection); // collection name: users, questions.

    // In a real-world app you'd have a http request / service call here like
    this.databaseSerivce.importData(formData).subscribe(
      data => {
        this.alertService.success(
          this.collection + " have been successfully uploaded. "
        );
        this.getData();
        this.loading = false;
        this.clearFile();
        this.modalRef.hide();
      },
      error => {
        console.log(error);
        this.loading = false;
        this.clearFile();
        this.modalRef.hide();
      }
    );
  }

  decline(): void {
    this.modalRef.hide();
    this.clearFile();
  }

  //upload file
  fileToUpload: File = null;
  filename: String = "";
  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.fileToUpload = event.target.files[0];
      this.filename = this.fileToUpload.name;
      console.log(this.fileToUpload);
    }
  }

  clearFile() {
    var filectrl = <HTMLInputElement>document.getElementById("upload");
    filectrl.value = "";
    this.fileToUpload = null;
    this.filename = "";
  }

  //onSubmit() {}
}
