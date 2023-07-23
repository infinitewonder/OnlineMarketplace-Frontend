import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css'],
})
export class ProductListingComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  editProductForm: FormGroup;
  editMode = false;
  selectedProduct: Product = {} as Product;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });

    this.editProductForm = this.fb.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  addProduct(): void {
    const product: Product = this.productForm.value;
    this.productService.addProduct(product).subscribe((newProduct) => {
      this.products.push(newProduct);
      this.productForm.reset();
    });
  }

  editProduct(product: Product): void {
    this.editMode = true;
    this.selectedProduct = product;
    this.editProductForm.setValue({
      productName: product.productName,
      description: product.description,
      price: product.price,
    });
  }

  updateProduct(): void {
    this.selectedProduct = this.editProductForm.value;
    this.productService.updateProduct(this.selectedProduct).subscribe(() => {
      this.loadProducts();
      this.editMode = false;
      this.editProductForm.reset();
    });
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editProductForm.reset();
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe(() => {
      this.loadProducts();
    });
  }
}
