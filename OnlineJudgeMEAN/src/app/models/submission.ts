export class Submission {
  constructor(
    public _id: string,
    public username: string,
    public questionname: string,
    public solution: string,
    public status: number
  ) {}
}
