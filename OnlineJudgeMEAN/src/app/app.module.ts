// modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertModule } from "ngx-bootstrap";
import { HttpClientModule } from "@angular/common/http";

// components
import {
  AppComponent,
  HeaderComponent,
  FooterComponent,
  MainpageComponent,
  QuestionlistComponent,
  QuestionpageComponent,
  UserlistComponent,
  UserpageComponent,
  SignupComponent,
  LoginComponent,
  AlertComponent
} from "./components/";

// services
import {
  QuestionService,
  UserService,
  AlertService,
  AuthenticationService
} from "./services/";
import { ErrorInterceptorProvider } from "./http.interceptor";

// routes
import { appRoutes } from "./app.route";
import { FieldErrorDisplayComponent } from "./components/field-error-display/field-error-display.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainpageComponent,
    QuestionlistComponent,
    QuestionpageComponent,
    UserpageComponent,
    UserlistComponent,
    SignupComponent,
    LoginComponent,
    FieldErrorDisplayComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    QuestionService,
    UserService,
    AlertService,
    AuthenticationService,
    ErrorInterceptorProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
