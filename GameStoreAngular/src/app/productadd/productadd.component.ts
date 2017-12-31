import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProductService } from './../product.service';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {
  statusCode: number;
  errmsg: string;
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
    image:new FormControl(this.service.baseUrl+"images/default.png")
  });

  constructor(private service: ProductService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);
    if (this.id != null) {
      this.service.getProductById(this.id).subscribe(product => {
        //console.log(product);
        this.productForm.setValue({ id: product.id, productName: product.productName, price: product.price, image: product.image });  
      },
      error => {this.statusCode = error.statusCode; this.errmsg = error.message});   
    }
  }

  //Handle create and update product
  onClickSubmit() {
    if (this.productForm.invalid) {
      return; //Validation failed, exit from method.
    }   
      //Form is valid, now perform create or update
    let product = this.productForm.value;
    console.log(product);
    if (product.id == null || product.id == "") {  
      //Create product
      product.id = 0;
      this.service.createProduct(product).subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['productlist'])
        },
        error => {this.statusCode = error.statusCode; this.errmsg = error.message});
    } else {  
      //Update product
      this.service.updateProduct(product).subscribe(successCode => {
          this.statusCode = successCode;
          this.router.navigate(['productlist'])
        },
        error => {this.statusCode = error.statusCode; this.errmsg = error.message});
    }
  }

  //Image upload
  @ViewChild("fileInput") fileInput;
  @ViewChild("productImage") productImage;

  filechanged(event): void {
    var name = this.fileInput.nativeElement.files[0].name;
    //console.log(name);
    this.filename = name;
  }

  upload(): void {
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      this.service.upload(fileToUpload)
        .subscribe(res => {
          //console.log("fileupload:" + res.statusCode);
          //console.log("fileupload:" + res.message);
          this.productForm.patchValue({image: res.message});
          this.productImage.src = res.message;
        },
        error => {this.statusCode = error.statusCode; this.errmsg = error.message});
    }
  }
}