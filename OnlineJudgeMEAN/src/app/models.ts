export class Question {
  constructor(
    public _id: string,
    public sequence: number,
    public title: string,
    public description: string,
    public difficulty: string
  ) {}
}

export class User {
  constructor(
    public _id: string,
    public username: string,
    public password: string,
    public email: string
  ) {}
}

export class ResponseResult {
  constructor(public status: number, public message: string) {}
}
