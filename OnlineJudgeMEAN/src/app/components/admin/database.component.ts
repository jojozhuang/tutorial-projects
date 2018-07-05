import { Component, Input, OnInit } from "@angular/core";
import { DatabaseService } from "./../../services";

@Component({
  selector: "app-database",
  templateUrl: "./database.component.html"
})
export class DatabaseComponent implements OnInit {
  selectedValue: string;
  collection: string;
  users;
  questions;
  submissions;

  constructor(private databaseSerivce: DatabaseService) {}

  @Input() options = [];

  ngOnInit() {
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
}
