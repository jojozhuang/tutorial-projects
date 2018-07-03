export class Submission {
  constructor(
    public _id: string,
    public username: string,
    public questionname: string,
    public language: string,
    public solution: string,
    public status: number, // -1: not submitted, 10: pass, 20: fail
    public timeupdated: Date,
    public timesubmitted: Date,
    public runtime: number
  ) {}
}
