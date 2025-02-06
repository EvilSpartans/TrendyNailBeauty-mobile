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

export interface ProductQueryParams {
  sortBy?: string;
  [key: string]: any; 
}

export interface ProductResponse {
  products: Product[];
  page: number;
  countPage: number;
  totalItems: number;
}