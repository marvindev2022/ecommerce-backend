import { Product } from "@domain/Product/Product";


export interface Category {
    id: string;
    name: string;
    products: Product[];
  }
  