import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InvalidParamError } from '@app/errors/InvalidParamError';
import { Product, ProductCreationProps } from '@domain/Product/Product';
import { ProductRepository } from '@app/repositories/Products/product';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async register(productData: ProductCreationProps) {
    if (productData.price < 0) {
      throw new InvalidParamError('Price must be a positive number');
    }
    const product = new Product(productData);
    const createdProduct = await this.productRepository.register(product);
    return createdProduct;
  }

  async findAllProduct() {
    const product = await this.productRepository.findAllProducts();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
  async findProduct(productId: string) {
    const product = await this.productRepository.findProducts(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async editProduct(productId: string, productData: ProductCreationProps) {
    const existingProduct = await this.productRepository.findProducts(
      productId,
    );
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }
  }
  async editAllProduct(productId: string, productData: ProductCreationProps) {
    const existingProduct = await this.productRepository.findProducts(
      productId,
    );
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    const updatedProduct = await this.productRepository.editAllProduct(
      productId,
      productData,
    );
    return updatedProduct;
  }

  async deleteProduct(productId: string) {
    const existingProduct = await this.productRepository.findProducts(
      productId,
    );
    if (!existingProduct) {
      throw new NotFoundException('Product not found');
    }

    const deletedProduct = await this.productRepository.deleteProduct(
      productId,
    );
    return deletedProduct;
  }
}
