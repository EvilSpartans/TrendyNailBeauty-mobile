import {Category} from './category';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  onSale: boolean;
  stock: string;
  createdAt: Date;
  category: Category;
  orderQuantity: number;
  quantity: number;
}
