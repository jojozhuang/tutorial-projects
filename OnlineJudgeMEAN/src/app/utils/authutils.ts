import { UserDetails } from "./../models";
const STORAGE_TOKEN = "currentToken";

export class AuthUtils {
  static user: any;
  static token: string;
  static saveToken(token: string): void {
    localStorage.setItem(STORAGE_TOKEN, token);
    this.token = token;
  }

  static getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem(STORAGE_TOKEN);
    }
    return this.token;
  }

  static getUserName(): string {
    if (this.user) {
      this.user = this.getUserDetails();
    }
    if (this.user) {
      return this.user.username;
    } else {
      return "";
    }
  }

  static clearToken(): void {
    if (this.token) {
      localStorage.removeItem(STORAGE_TOKEN);
    }
    this.token = "";
  }

  static getUserDetails(): UserDetails {
    let token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
}
