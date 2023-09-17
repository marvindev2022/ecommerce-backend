import { Product } from "../Products/registerProduct.dto";
import { RegisterUserDTO } from "../User/registerUser.dto";

 
  export interface Order {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
    user: RegisterUserDTO;
    product: Product;
  }
  