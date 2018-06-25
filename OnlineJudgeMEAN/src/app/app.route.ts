import { RouterModule, Routes } from "@angular/router";

// components
import {
  AlertComponent,
  AppComponent,
  HeaderComponent,
  FooterComponent,
  HomepageComponent,
  SignupComponent,
  LoginComponent,
  ResetpwdComponent,
  ProfileComponent,
  QuestionlistComponent,
  QuestionpageComponent,
  EditorComponent,
  UserlistComponent,
  UserpageComponent,
  WysiwygComponent,
  QuestionComponent
} from "./components/";

// services
import { AuthGuardService } from "./services/";

export const appRoutes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "homepage", component: HomepageComponent },
  { path: "questions", component: QuestionComponent },
  {
    path: "admin/userlist",
    component: UserlistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/userpage",
    component: UserpageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/userpage/:_id",
    component: UserpageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/questionlist",
    component: QuestionlistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/questionpage",
    component: QuestionpageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "admin/questionpage/:_id",
    component: QuestionpageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "editor",
    component: EditorComponent
  },
  {
    path: "wysiwyg",
    component: WysiwygComponent
  },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  {
    path: "resetpwd",
    component: ResetpwdComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];
