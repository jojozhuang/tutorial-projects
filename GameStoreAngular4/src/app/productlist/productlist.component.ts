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

  ngOnInit() {
    this.getProducts();
  }
  //Fetch all articles
  getProducts() {
    this.service.getProducts().subscribe(
              data => this.products = data,
              errorCode => this.statusCode = errorCode);   
    }

  deleteProduct(event) { 
    if(window.confirm('Are you sure to delete this product?')){
      //console.log(event.id);
      this.service.deleteProductById(event.id).subscribe(successCode => {
        this.statusCode = successCode;
        this.getProducts();	
      },
      errorCode => this.statusCode = errorCode);    
    }
  }
}
