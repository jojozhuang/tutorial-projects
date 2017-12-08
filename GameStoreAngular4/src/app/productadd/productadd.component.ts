import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators} from '@angular/forms';
//import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from './../product.service';
import { Product, ResponseResult } from './../product';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {
  subscription:Subscription;
  statusCode: number;
  filename: string;
  id;

  //Create form
  productForm = new FormGroup({
    id: new FormControl(""),
    productName: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)
    ])),
    price: new FormControl("0", Validators.compose([
        Validators.required,
        Validators.min(0),
        Validators.max(2147483647)
    ])),
    image:new FormControl("images/default.png") 
  });

  constructor(private service: ProductService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    console.log(222);
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if (this.id != null) {
      this.loadProduct(this.id);
    }
  }
  
  //Load article by id to edit
  loadProduct(id: number) {
    this.service.getProductById(id).subscribe(product => {
      //this.articleIdToUpdate = article.id;   
      this.updateUI(product);
      //this.processValidation = true;
      //this.requestProcessing = false;   
    },
    errorCode =>  this.statusCode = errorCode);    
  }
  updateUI(product) {
    console.log(product);
    this.productForm.setValue({ id: product.id, productName: product.productName, price: product.price, image: product.image });
  }

  //Handle create and update article
  onArticleFormSubmit() {
	  //this.processValidation = true;   
	  if (this.productForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
    //this.preProcessConfigurations();
    let product = this.productForm.value;
    console.log(product);
	  if (product.id == null || product.id == "") {  
      //Create article
      product.id = 0;
      console.log()
     	this.service.createProduct(product).subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['productlist'])
			  },
		    errorCode => this.statusCode = errorCode);
	  } else {  
	    this.service.updateProduct(product).subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['productlist'])
        },
        errorCode => this.statusCode = errorCode);	  
	  }
  }

  onClickSubmit(data) {
    this.onArticleFormSubmit();
  }

  @ViewChild("fileInput") fileInput;
  @ViewChild("productImage") productImage;
  filechanged(event): void {    
    var name = this.fileInput.nativeElement.files[0].name;
    console.log(name);
    this.filename = name;
  }
  upload(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.service.upload(fileToUpload)
        .subscribe(res => {
          console.log(res);
          this.productForm.patchValue({image: res.message});
          this.productImage.src = res.message;
          //console.log(this.productForm.image);
          //this.loadProduct(+this.productId.nativeElement.value);
        });
    }
  }
}
