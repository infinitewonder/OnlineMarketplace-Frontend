import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
})
export class ProductListingComponent implements OnInit {
  products: Product[] = [];
  addProductForm!: FormGroup;
  editProductForm!: FormGroup;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.initializeForms();
    this.getProducts();
  }

  initializeForms() {
    this.addProductForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    });

    this.editProductForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addProduct() {
    const productData = this.addProductForm.value;
    this.productService.addProduct(productData).subscribe(
      (response: Product) => {
        this.products.push(response);
        this.addProductForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateProduct() {
    const productData = this.editProductForm.value;
    this.productService.updateProduct(productData).subscribe(
      (response: Product) => {
        const updatedProductIndex = this.products.findIndex(
          (p) => p.id == response.id
        );
        this.products[updatedProductIndex] = response;
        this.editProductForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (response: any) => {
        this.products = this.products.filter((product) => product.id !== id);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
