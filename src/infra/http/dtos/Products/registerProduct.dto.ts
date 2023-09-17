import { RegisterUserDTO } from "../User/registerUser.dto";
import { Cart } from '../Cart/cart.dto';
import { Category } from "../category/category.dto";
import { Order } from "../Order/order.dto";


  export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    categoryId: string;
    category: Category;
    cart?: Cart; 
    order?: Order
  }
  
  
 
