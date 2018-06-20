import { RouterModule, Routes } from "@angular/router";

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
  AlertComponent,
  ProfileComponent
} from "./components/";

// services
import { AuthGuardService } from "./services/";

export const appRoutes: Routes = [
  { path: "", component: MainpageComponent },
  { path: "mainpage", component: MainpageComponent },
  { path: "questionlist", component: QuestionlistComponent },
  { path: "questionpage", component: QuestionpageComponent },
  { path: "questionpage/:_id", component: QuestionpageComponent },
  { path: "userlist", component: UserlistComponent },
  { path: "userpage", component: UserpageComponent },
  { path: "userpage/:_id", component: UserpageComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  // otherwise redirect to home
  { path: "**", redirectTo: "" }
];
