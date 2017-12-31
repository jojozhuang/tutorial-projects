import { Component, OnInit } from '@angular/core';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  constructor(private service: ProductService) { }
  products;
  statusCode: number;
  errmsg: string;

  ngOnInit() {
    this.getProducts();
  }
  //Fetch all products
  getProducts() {
    this.service.getProducts().subscribe(
      data => this.products = data,
      error => {this.statusCode = error.statusCode; this.errmsg = error.message});   
    }

  deleteProduct(event) { 
    if(window.confirm('Are you sure to delete this product?')){
      //console.log(event.id);
      this.service.deleteProductById(event.id).subscribe(successCode => {
        this.statusCode = successCode;
        this.getProducts();	
      },
      error => {this.statusCode = error.statusCode; this.errmsg = error.message});
    }
  }
}
