import {Product} from './product';
import {User} from './user';

export interface Order {
  id?: string;
  createdAt: Date;
  price: number;
  status: string;
  invoice: string;
  product: Product;
  user: User;
}
