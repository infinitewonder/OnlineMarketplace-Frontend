import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(
      'http://onlinemarketplace-production.up.railway.app/orders'
    );
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(
      `http://onlinemarketplace-production.up.railway.app/orders/${id}`
    );
  }

  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(
      'http://onlinemarketplace-production.up.railway.app/orders',
      order
    );
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(
      `http://onlinemarketplace-production.up.railway.app/orders/${id}`,
      order
    );
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete(
      `http://onlinemarketplace-production.up.railway.app/orders/${id}`
    );
  }
}
