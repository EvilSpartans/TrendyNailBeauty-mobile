import { Product } from './Product';

export interface Category {
  id: string;
  name: string;
  mostProducts: boolean;
  mostOnSale: boolean;
  outOfStock: boolean;
  image: string;
  product: Product[];
}
