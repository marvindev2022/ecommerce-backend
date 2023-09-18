import { Module } from '@nestjs/common';
import { UsersModule } from './controllers/users/user.module';
import { ImagesModule } from './controllers/images/images.module';
@Module({
  imports: [
    UsersModule,
    ImagesModule,
    ProductsModule,
    
  ],
})
export class HttpModule {}
