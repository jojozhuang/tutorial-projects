import { RouterModule, Routes } from "@angular/router";

// components
import {
  AppComponent,
  HeaderComponent,
  FooterComponent,
  HomepageComponent,
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
  { path: "", component: HomepageComponent },
  { path: "homepage", component: HomepageComponent },
  {
    path: "questionlist",
    component: QuestionlistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "questionpage",
    component: QuestionpageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "questionpage/:_id",
    component: QuestionpageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "userlist",
    component: UserlistComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "userpage",
    component: UserpageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "userpage/:_id",
    component: UserpageComponent,
    canActivate: [AuthGuardService]
  },
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
