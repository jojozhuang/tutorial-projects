import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Product, ResponseResult } from './models';

@Injectable()
export class ProductService {
  //URL for CRUD operations
  baseUrl = "http://localhost:5000/";
  apiUrl = this.baseUrl + "api/product";

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
           .map(res => res.status)
  }
  //Fetch product by id
  getProductById(pid: string): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + "/" + pid)
  }
  //Update product
  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.apiUrl + "/" + product._id, product, {observe: 'response'})
           .map(res => res.status)
  }
  //Delete product
  deleteProductById(pid: string): Observable<any> {
    return this.http.delete(this.apiUrl +"/"+ pid, {observe: 'response'})
           .map(res => res.status)
  }
}