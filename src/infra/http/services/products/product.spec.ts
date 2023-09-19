import { InMemoryProductRepository } from '@test/repositories/in-memory-product-repository';
import { ProductService } from './products.service';
import { Product } from '@domain/Product/Product';
import { BadRequestException } from '@nestjs/common';

describe('ProductService', () => {
  const productRepository = new InMemoryProductRepository();
  const productService = new ProductService(productRepository);

  const makeSud = async () => {
    const newProduct = new Product({
      name: 'Any Product',
      price: 10.99,
      description: 'Description',
    });

    const productId = await productService.register(newProduct);
    return productId;
  };

  it('should register a new product', async () => {
    const productId = await makeSud();
    const product = await productRepository.findProductById(productId);
    expect(product).toBeTruthy();
  });

  it('should throw an error if invalid product data is provided', async () => {
    const newProduct = new Product({
      // Invalid data
    });

    try {
      await productService.register(newProduct);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('should edit an existing product', async () => {
    const productId = await makeSud();
    const updatedProductData = {
      name: 'Updated Product',
      price: 15.99,
      description: 'Updated Description',
    };

    await productService.editProduct(productId, updatedProductData);
    const updatedProduct = await productRepository.findProductById(productId);
    expect(updatedProduct.props.name).toEqual(updatedProductData.name);
  });

  it('should throw an error if editing a non-existent product', async () => {
    const nonExistentProductId = 'non-existent-id';
    const updatedProductData = {
      name: 'Updated Product',
      price: 15.99,
      description: 'Updated Description',
    };

    try {
      await productService.editProduct(nonExistentProductId, updatedProductData);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  // Add more test cases as needed
});
