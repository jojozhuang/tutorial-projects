// modules
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AlertModule } from "ngx-bootstrap";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AceEditorModule } from "ng2-ace-editor";
import { NgxEditorModule } from "ngx-editor";
import { NgProgressModule, NgProgressInterceptor } from "ngx-progressbar";

// components
import {
  AlertComponent,
  ValidationMessageComponent,
  AppComponent,
  HeaderComponent,
  FooterComponent,
  HomepageComponent,
  QuestionsComponent,
  QuestionComponent,
  EditorComponent,
  UsersComponent,
  UserComponent,
  SignupComponent,
  LoginComponent,
  ResetpwdComponent,
  ProfileComponent,
  WysiwygComponent,
  AlgorithmQuestionComponent,
  AlgorithmQuestionsComponent,
  ContextualLabelComponent,
  ProgressBarComponent,
  LoadingImageComponent,
  DifficultySelectComponent,
  WysiwygEditorComponent,
  CodeEditorComponent,
  RatingInputComponent
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
    QuestionsComponent,
    QuestionComponent,
    UsersComponent,
    UserComponent,
    SignupComponent,
    LoginComponent,
    ResetpwdComponent,
    ProfileComponent,
    EditorComponent,
    WysiwygComponent,
    ContextualLabelComponent,
    ProgressBarComponent,
    LoadingImageComponent,
    AlgorithmQuestionComponent,
    AlgorithmQuestionsComponent,
    DifficultySelectComponent,
    WysiwygEditorComponent,
    CodeEditorComponent,
    RatingInputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AceEditorModule,
    NgxEditorModule,
    NgProgressModule
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
    CookieInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: NgProgressInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
