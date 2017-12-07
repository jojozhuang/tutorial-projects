import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product } from './product';

@Injectable()
export class ProductService {
  //URL for CRUD operations
  apiUrl = "http://localhost:5000/api/products";
  //Create constructor to get Http instance
  constructor(private http: HttpClient) { 
  }
  //Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get(this.apiUrl).map(this.extractData)
           .catch(this.handleError);
  }
  //Create product
  createProduct(product: Product):Observable<number> {
      return this.http.post(this.apiUrl, product)
             //.map(success => success.status)
             .catch(this.handleError);
  }
  //Fetch product by id
  getProductById(pid: number): Observable<Product> {
    console.log(this.apiUrl +"/"+ pid);
    return this.http.get(this.apiUrl + "/" + pid)
           .map(this.extractData)
           .catch(this.handleError);
  }	
  //Update product
  updateProduct(product: Product):Observable<number> {
    return this.http.put(this.apiUrl +"/"+ product.id, product)
           //.map(success => success.status)
           .catch(this.handleError);
  }
  //Delete product	
  deleteProductById(pid: number): Observable<number> {
    return this.http.delete(this.apiUrl +"/"+ pid)
           //.map(success => success.status)
          .catch(this.handleError);
  }	

  upload(id: number, fileToUpload: any) {
    let input = new FormData();
    input.append("id", id + '');
    input.append("file", fileToUpload);

    return this.http.post(this.apiUrl +"/"+"UploadFile", input);
}
  private extractData(res: Response) {
    return res;
  }

  private handleError (error: Response | any) {
    //console.error(error.message || error);
    return Observable.throw(error.status);
  }
}
