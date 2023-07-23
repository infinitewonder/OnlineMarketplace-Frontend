import { User } from './user';
import { Product } from './product';

export class Order {
  id!: number;
  quantity!: number;
  orderStatus!: OrderStatus;
  user!: User;
  product!: Product;
}

export enum OrderStatus {
  NEW = 'NEW',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}
