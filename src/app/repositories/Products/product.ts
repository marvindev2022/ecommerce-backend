import { Product } from "@domain/Product/Product";
import { EditProductDTO } from "@infra/http/dtos/Products/editProduct.dto";




export abstract class ProductRepository {


    abstract register(product: Product): Promise<string>;

    abstract findProducts(productId: string): Promise<Product>;

    abstract findAllProducts(): Promise<Product[]>;

    abstract deleteProduct(productId: string): Promise<void>;

    abstract editProduct(productId: string, product: EditProductDTO): Promise<void>;

    abstract editAllProduct(productId: string, product: EditProductDTO): Promise<void>;
}