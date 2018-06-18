import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from "@angular/router";

import { ProductService } from "./../product.service";

@Component({
  selector: "app-productadd",
  templateUrl: "./productadd.component.html",
  styleUrls: ["./productadd.component.css"]
})
export class ProductaddComponent implements OnInit {
  status: number;
  message: string;
  _id;

  //Create form
  productForm = new FormGroup({
    _id: new FormControl(""),
    name: new FormControl(
      "",
      Validators.compose([Validators.required, Validators.minLength(3)])
    ),
    price: new FormControl(
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("[0-9]+"),
        Validators.min(0),
        Validators.max(2147483647)
      ])
    )
  });

  constructor(
    private service: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get("_id");
    //console.log(this._id);
    if (this._id != null) {
      this.service.getProductById(this._id).subscribe(
        product => {
          //console.log(product);
          this.productForm.setValue({
            _id: product._id,
            name: product.name,
            price: product.price
          });
        },
        error => {
          this.status = error.status;
          this.message = error.message;
        }
      );
    }
  }

  //Handle create and update product
  onClickSubmit() {
    if (this.productForm.invalid) {
      return; //Validation failed, exit from method.
    }
    //Form is valid, now perform create or update
    let product = this.productForm.value;
    //console.log(product);
    if (product._id == null || product._id == "") {
      //Create product
      product._id = "";
      this.service.createProduct(product).subscribe(
        status => {
          this.status = status;
          this.router.navigate(["productlist"]);
        },
        error => {
          this.status = error.status;
          this.message = error.message;
        }
      );
    } else {
      //Update product
      this.service.updateProduct(product).subscribe(
        status => {
          this.status = status;
          this.router.navigate(["productlist"]);
        },
        error => {
          this.status = error.statusCode;
          this.message = error.message;
        }
      );
    }
  }
}
