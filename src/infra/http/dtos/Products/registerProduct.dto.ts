import { Cart } from '../Cart/cart.dto';
import { Category } from "../category/category.dto";
import { Order } from "../Order/order.dto";


  export interface RegisterProductDTO {
    id: string;
    name: string;
    description: string;
    price: number;
    photo?: string;
    quantity: number;
    categoryId: string;
    category: Category;
    cart?: Cart; 
    order?: Order
  }
  
  
 
