
import { Product } from "../Products/registerProduct.dto";
import { RegisterUserDTO } from "../User/registerUser.dto";

export interface Cart  {
    id: string;
    userId: string;
    productId: string;
    quantity: number;
    totalPrice: number;
    user: RegisterUserDTO;
    product: Product;
  }
  