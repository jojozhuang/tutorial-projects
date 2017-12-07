import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormControl, Validators} from '@angular/forms';
//import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from './../product.service';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {
  subscription:Subscription;
  stateCtrl: FormControl;
  //product;
  statusCode: number;

  //Create form
  productForm = new FormGroup({
    id: new FormControl(""),
    productName: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(3)
    ])),
    price:new FormControl(""),
    image:new FormControl("") 
  });

  constructor(private service: ProductService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    console.log(222);
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id != null) {
      this.loadProduct(+id);
    }
  }
  
  //Load article by id to edit
  loadProduct(id: number) {
    this.service.getProductById(id).subscribe(product => {
      //this.articleIdToUpdate = article.id;   
      console.log(product);
      this.productForm.setValue({ id: product.id, productName: product.productName, price: product.price, image: product.image });
      //this.processValidation = true;
      //this.requestProcessing = false;   
    },
    errorCode =>  this.statusCode = errorCode);    
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
     	this.service.createProduct(product)
			  .subscribe(successCode => {
				   this.statusCode = successCode;
				   //this.getAllArticles();	
           //this.backToCreateArticle();
           this.router.navigate(['productlist'])
				 },
				 errorCode => this.statusCode = errorCode
        );
	   } else {  
   	     //Handle update article
//             article.id = this.articleIdToUpdate; 		
	     this.service.updateProduct(product).subscribe(successCode => {
         this.statusCode = successCode;
         this.router.navigate(['productlist'])
		     //this.getAllArticles();	
		     //this.backToCreateArticle();
		},
		errorCode => this.statusCode = errorCode);	  
	   }
   }

  onClickSubmit(data) {
    this.onArticleFormSubmit();
  }
}
