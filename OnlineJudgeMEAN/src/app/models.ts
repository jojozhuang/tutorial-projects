export interface UserDetails {
  _id: string;
  email: string;
  username: string;
  exp: number;
  iat: number;
}

export interface TokenResponse {
  token: string;
  username: string;
}

/*
export interface ValidationError {
  location: string;
  param: string;
  value: string;
  msg: string;
}*/

export class AlertMessage {
  constructor(public type: string, public text: string) {}
}

export interface AlertMessageList extends Array<AlertMessage> {}

export interface TokenPayload {
  username: string;
  password: string;
  email?: string;
}

export class User {
  constructor(
    public _id: string,
    public username: string,
    public password: string,
    public email: string
  ) {}
}

export class Question {
  constructor(
    public _id: string,
    public sequence: number,
    public title: string,
    public description: string,
    public difficulty: string
  ) {}
}

export class ResponseResult {
  constructor(public status: number, public message: string) {}
}
