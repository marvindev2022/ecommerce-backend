import { ProductRepository } from '@app/repositories/Products/product';
import { Product, ProductCreationProps } from '@domain/Product/Product';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private prismaService: PrismaService) {}

  async register(product: any): Promise<string> {
    try {
      if (product instanceof Error) {
        throw new BadRequestException(product.message, {
          cause: product,
          description: product.stack,
        });
      }

      const { id } = await this.prismaService.product.create({
        data: {
          ...product.props,
          photo: ['',''],
        },
        select: {
          id: true,
        },
      });

      return id;
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Erro ao registrar o produto', {
        cause: error as Error,
      });
    }
  }

  async findProducts(id: string): Promise<Product | any> {
    return await this.prismaService.product.findFirst({
      where: { id },
    });
  }

  async findAllProducts(): Promise<Product[] | any > {
    return await this.prismaService.product.findMany();
    
  }

  async deleteProduct(productId: string): Promise<void> {
    const product = await this.prismaService.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    await this.prismaService.product.delete({
      where: { id: productId },
    });
  }

  async editProduct(productId: string, updatedProduct: any): Promise<void> {
    try {
      await this.prismaService.product.update({
        where: { id: productId },
        data: {
         photo:[ updatedProduct.photo],
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao editar o produto', {
        cause: error as Error,
      });
    }
  }

  async editAllProduct(
    productId: string,
    updatedProduct: any,
  ): Promise<any> {
    try {
     const a =  await this.prismaService.product.update({
        where: { id: productId },
        data: {
          ...updatedProduct,
        },
      });
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar o produto', {
        cause: error as Error,
      });
    }
  }
}
