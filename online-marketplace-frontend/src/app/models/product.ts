import { Order } from './order';
import { User } from './user';

export class Product {
  id!: number;
  productName!: string;
  description!: string;
  price!: number;
  user!: User;

  orders?: Order[];
}
