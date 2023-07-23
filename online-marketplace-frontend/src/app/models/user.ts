import { Order } from './order';
import { Product } from './product';

export class User {
  id!: number;
  username!: string;
  password!: string;
  email!: string;
  userType!: UserType;

  products?: Product[];
  orders?: Order[];
}

export enum UserType {
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
}
