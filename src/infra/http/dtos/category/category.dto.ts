import { Product } from "../Products/registerProduct.dto";

export interface Category {
    id: string;
    name: string;
    products: Product[];
  }
  