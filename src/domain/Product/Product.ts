import { InvalidParamError } from '@app/errors/InvalidParamError';
import { MissingParamError } from '@app/errors/MissingParamError';
import { Category } from '@infra/http/dtos/category/category.dto';
import { z } from 'zod';

export interface ProductCreationProps {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
}

interface NewProduct {
  body: ProductCreationProps;
  statusCode: number;
}

interface IsValidMethodReturn {
  isValid: boolean;
  body: any;
  statusCode: number;
}

export class Product {
  props: ProductCreationProps;

  constructor(props: ProductCreationProps) {
    const newProduct = this.handle(props);

    if (newProduct.statusCode >= 300) {
      throw newProduct.body;
    }

    this.props = newProduct.body;
  }

  private handle(props: ProductCreationProps): NewProduct {
    const { isValid, body, statusCode } = this.isValid(props);

    if (!isValid) {
      return {
        body,
        statusCode,
      };
    }

    return {
      body: props,
      statusCode: 200,
    };
  }

  private isValid(params: ProductCreationProps): IsValidMethodReturn {
    const productSchema = z.object({
      name: z.string().min(3, { message: 'Invalid' }),
      description: z.string().min(6, { message: 'Invalid' }),
      price: z.number().min(0.01, { message: 'Invalid' }),
      quantity: z.number().int().min(1, { message: 'Invalid' }),
      categoryId: z.string().min(6, { message: 'Invalid' }),
      category: z.string().min(6, { message: 'Invalid' }),
    });

    const productIsValid = productSchema.safeParse(params);

    if (!productIsValid.success) {
      const errorPath = productIsValid.error.errors[0].path[0].toString();
      const errorMessage = productIsValid.error.errors[0].message;
      const errorBody =
        errorMessage === 'Invalid'
          ? new InvalidParamError(errorPath)
          : new MissingParamError(errorPath);

      return {
        isValid: false,
        body: errorBody,
        statusCode: 400,
      };
    }

    return {
      isValid: true,
      body: null,
      statusCode: 200,
    };
  }
}
