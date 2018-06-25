// modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertModule } from "ngx-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { AceEditorModule } from "ng2-ace-editor";
import { NgxEditorModule } from "ngx-editor";

// components
import {
  AlertComponent,
  ValidationMessageComponent,
  AppComponent,
  HeaderComponent,
  FooterComponent,
  HomepageComponent,
  QuestionlistComponent,
  QuestionpageComponent,
  EditorComponent,
  UserlistComponent,
  UserpageComponent,
  SignupComponent,
  LoginComponent,
  ResetpwdComponent,
  ProfileComponent,
  WysiwygComponent,
  QuestionComponent,
  ContextualLabelComponent,
  ProgressBarComponent
} from "./components/";

// services
import {
  QuestionService,
  UserService,
  AlertService,
  AuthenticationService,
  AuthGuardService,
  OnlineJudgeService
} from "./services/";

// Interceptor
import {
  ErrorInterceptor,
  JwtInterceptor,
  CookieInterceptor
} from "./interceptor";

// routes
import { appRoutes } from "./app.route";

@NgModule({
  declarations: [
    AlertComponent,
    ValidationMessageComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    QuestionlistComponent,
    QuestionpageComponent,
    UserpageComponent,
    UserlistComponent,
    SignupComponent,
    LoginComponent,
    ResetpwdComponent,
    ProfileComponent,
    EditorComponent,
    WysiwygComponent,
    QuestionComponent,
    ContextualLabelComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AceEditorModule,
    NgxEditorModule
  ],
  providers: [
    QuestionService,
    OnlineJudgeService,
    UserService,
    AlertService,
    AuthenticationService,
    AuthGuardService,
    ErrorInterceptor,
    JwtInterceptor,
    CookieInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
