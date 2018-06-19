// modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AlertModule } from "ngx-bootstrap";
import { HttpClientModule } from "@angular/common/http";

// components
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MainpageComponent } from "./mainpage/mainpage.component";
import { QuestionlistComponent } from "./questionlist/questionlist.component";
import { QuestionpageComponent } from "./questionpage/questionpage.component";
import { UserlistComponent } from "./userlist/userlist.component";
import { UserpageComponent } from "./userpage/userpage.component";

// services
import { QuestionService } from "./question.service";
import { UserService } from "./user.service";
import { ErrorInterceptorProvider } from "./http.interceptor";

const appRoutes: Routes = [
  { path: "", component: MainpageComponent },
  { path: "mainpage", component: MainpageComponent },
  { path: "questionlist", component: QuestionlistComponent },
  { path: "questionpage", component: QuestionpageComponent },
  { path: "questionpage/:_id", component: QuestionpageComponent },
  { path: "userlist", component: UserlistComponent },
  { path: "userpage", component: UserpageComponent },
  { path: "userpage/:_id", component: UserpageComponent },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    QuestionlistComponent,
    QuestionpageComponent,
    UserpageComponent,
    UserlistComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    HttpClientModule
  ],
  providers: [QuestionService, UserService, ErrorInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
