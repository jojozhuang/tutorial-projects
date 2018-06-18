export class Product {
  constructor(public _id: string, public name: string, public price: number) {}
}

export class ResponseResult {
  constructor(public status: number, public message: string) {}
}
