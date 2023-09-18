import { HttpRequest } from '@app/protocols/http';
import { Product } from './Product';
import { MissingParamError } from '@app/errors/MissingParamError';
import { InvalidParamError } from '@app/errors/InvalidParamError';

describe('Product', () => {
  const makeSut = (props: HttpRequest) => {
    return new Product(props.body);
  };

  it('should create a new product with valid parameters', () => {
    const httpRequest: HttpRequest = {
      body: {
        name: 'Sample Product',
        description: 'A sample product description',
        price: 99.99,
        quantity: 10,
        categoryId: 'category123',
      },
    };

    const product = makeSut(httpRequest);

    expect(product.props).toEqual(httpRequest.body);
  });

  it.only('should throw missing error param if name is missing', () => {
    const httpRequest: HttpRequest = {
      body: {
        // Missing 'name' field
        description: 'A sample product description',
        price: 99.99,
        quantity: 10,
        categoryId: 'category123',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new MissingParamError('name'));
  });

  it('should throw missing error param if description is missing', () => {
    const httpRequest: HttpRequest = {
      body: {
        name: 'Sample Product',
        // Missing 'description' field
        price: 99.99,
        quantity: 10,
        categoryId: 'category123',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('description'),
    );
  });

  it('should throw invalid error param if price is negative', () => {
    const httpRequest: HttpRequest = {
      body: {
        name: 'Sample Product',
        description: 'A sample product description',
        price: -5.0, // Invalid price (negative)
        quantity: 10,
        categoryId: 'category123',
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(new InvalidParamError('price'));
  });

  it('should throw missing error param if quantity is missing', () => {
    const httpRequest: HttpRequest = {
      body: {
        name: 'Sample Product',
        description: 'A sample product description',
        price: 99.99,
        // Missing 'quantity' field
        categoryId: 'category123',
        category: { id: 'any id', name: 'Sample Category', products: [] },
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new MissingParamError('quantity'),
    );
  });

  it('should throw invalid error param if categoryId is too short', () => {
    const httpRequest: HttpRequest = {
      body: {
        name: 'Sample Product',
        description: 'A sample product description',
        price: 99.99,
        quantity: 10,
        categoryId: 'cat', // Invalid categoryId (less than 6 characters)
      },
    };

    expect(() => makeSut(httpRequest)).toThrow(
      new InvalidParamError('categoryId'),
    );
  });
});
