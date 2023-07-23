import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      'http://onlinemarketplace-production.up.railway.app/products'
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(
      `http://onlinemarketplace-production.up.railway.app/products/${id}`
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(
      'http://onlinemarketplace-production.up.railway.app/products',
      product
    );
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `http://onlinemarketplace-production.up.railway.app/products/${product.id}`,
      product
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(
      `http://onlinemarketplace-production.up.railway.app/products/${id}`
    );
  }
}
