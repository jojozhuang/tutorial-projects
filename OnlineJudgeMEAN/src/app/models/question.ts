export class Question {
  constructor(
    public _id: string,
    public sequence: number,
    public title: string,
    public description: string,
    public difficulty: string
  ) {}
}
