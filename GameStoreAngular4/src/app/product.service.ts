import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Product, ResponseResult } from './models';

@Injectable()
export class ProductService {
  //URL for CRUD operations
  serverUrl = "http://localhost:5000/";
  apiUrl = "http://localhost:5000/api/products";
  uploadUrl = "http://localhost:5000/api/upload";
  /*serverUrl = "http://localhost:8080/";
  apiUrl = "http://localhost:8080/api/products";
  uploadUrl = "http://localhost:8080/api/upload";*/
  
  //Create constructor to get Http instance
  constructor(private http: HttpClient) { 
  }
  //Fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
  }
  //Create product
  createProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product, {observe: 'response'})
           .map(success => success.status)
  }
  //Fetch product by id
  getProductById(pid: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + "/" + pid)
  }	
  //Update product
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.apiUrl + "/" + product.id, product, {observe: 'response'})
           .map(success => success.status)
  }
  //Delete product	
  deleteProductById(pid: number): Observable<any> {
    return this.http.delete(this.apiUrl +"/"+ pid, {observe: 'response'})
           .map(success => success.status)
  }
  //Upload image
  upload(fileToUpload: any): Observable<ResponseResult> {
    let input = new FormData();
    input.append("file", fileToUpload);

    return this.http.post<ResponseResult>(this.uploadUrl, input)
  }
}
