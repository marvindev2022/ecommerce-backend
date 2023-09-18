import { Module } from '@nestjs/common';
import { UsersDatabaseModule } from './prisma/repositories/prisma-user-database.module';
import { ProductsDatabaseModule } from './prisma/repositories/prisma-product-database.module';

@Module({
  imports: [UsersDatabaseModule, ProductsDatabaseModule],
})
export class DatabaseModule {}
