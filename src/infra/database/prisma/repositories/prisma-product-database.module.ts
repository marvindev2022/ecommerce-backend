import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductRepository } from '@app/repositories/Products/product';
import { PrismaProductRepository } from './prisma-products-repository';

@Module({
  providers: [
    PrismaService,
    { provide: ProductRepository, useClass: PrismaProductRepository },
  ],
  exports: [{ provide: ProductRepository, useClass: PrismaProductRepository }],
})
export class ProductsDatabaseModule {}
