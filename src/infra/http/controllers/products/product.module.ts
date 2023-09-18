import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductService } from '@infra/http/services/products/product.service';
import { PrismaService } from '@infra/database/prisma/prisma.service';
import { ValidateToken } from '@infra/http/middlewares/users/validateToken';
import { ProductsDatabaseModule } from '@infra/database/prisma/repositories/prisma-product-database.module';

@Module({
  imports: [ProductsDatabaseModule],
  controllers : [ProductsController],
  providers:[ProductService,PrismaService]
})

export class ProductModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(ValidateToken)
      .forRoutes('/products/*')
  }

}