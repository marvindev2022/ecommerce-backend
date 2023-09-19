import { ProductRepository } from '@app/repositories/Products/product';
import { Product } from '@domain/Product/Product';
import { EditProductDTO } from '@infra/http/dtos/Products/editProduct.dto';
import { RegisterProductDTO } from '@infra/http/dtos/Products/registerProduct.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  async register(product: Product): Promise<string> {
    this.products.push(product);
    return 'valid_id';
  }

  async edit(
    productId: string,
    productData: EditProductDTO,
  ): Promise<void | Error> {
    const product = this.products.find((p) => p.props.name=== productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Update product properties based on productData
    product.props = { ...product.props, ...productData };
  }

  async findProduct(productId: string): Promise<Product> {
    const product = this.products.find((p) => p.props.name=== productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async findProductById(productId: string): Promise<Product | undefined> {
    return this.products.find((p) => p.props.name=== productId);
  }

  async deleteProduct(productId: string): Promise<void> {
    const index = this.products.findIndex((p) => p.props.name=== productId);

    if (index === -1) {
      throw new NotFoundException('Product not found');
    }

    this.products.splice(index, 1);
  }

  async findAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async saveImage(id: string, photoUrl: string): Promise<void> {
    // Implement logic for saving images if needed
  }

  async findProducts(productId: string): Promise<any> {
    // Implement logic to search for products based on a query
    const p = this.products.filter((product) => {
      return new Product(p);
    });
  }

  async editProduct(
    productId: string,
    product: Partial<RegisterProductDTO>,
  ): Promise<void> {}
  async editAllProduct(
    productId: string,
    product: Partial<RegisterProductDTO>,
  ): Promise<void> {}
}
