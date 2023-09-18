import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductRepository } from '@app/repositories/Products/product';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { Product, ProductCreationProps } from '@domain/Product/Product';

// Mock do repositório de produtos
const productRepositoryMock: ProductRepository = {
  register: jest.fn(),
  findAllProducts: jest.fn(),
  findProducts: jest.fn(),
  editProduct: jest.fn(),
  editAllProduct: jest.fn(),
  deleteProduct: jest.fn(),
};

describe('ProductService', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: ProductRepository,
          useValue: productRepositoryMock,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  describe('register', () => {
    it('should register a product', async () => {
      const productData: ProductCreationProps = {
        name: 'Product Name',
        description: 'Product Description',
        price: 10.99,
        quantity: 100,
        categoryId: 'category-id',
      };

      productRepositoryMock.register.mockResolvedValue('created-product-id');

      const createdProduct = await productService.register(productData);

      expect(productRepositoryMock.register).toHaveBeenCalledWith(
        expect.objectContaining(productData),
      );
      expect(createdProduct).toBe('created-product-id');
    });

    it('should throw BadRequestException when price is negative', async () => {
      const productData: ProductCreationProps = {
        name: 'Product Name',
        description: 'Product Description',
        price: -5.0, // Negative price
        quantity: 100,
        categoryId: 'category-id',
      };

      await expect(productService.register(productData)).rejects.toThrowError(
        BadRequestException,
      );
    });
  });

});
