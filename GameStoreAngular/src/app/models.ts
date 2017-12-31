export class Product {
    constructor(
        public id: number, 
        public productName: string, 
        public price: number, 
        public image: string) 
    { }
}

export class ResponseResult {
    constructor(
        public statusCode: number, 
        public message: string) 
    { }
}