import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import { HttpModule } from '@infra/http/http.module';
import { ConfigModule } from '@nestjs/config';
import { MessageController } from 'src/app.controler';
import { MulterModule } from '@nestjs/platform-express'; 

@Module({
  imports: [
    ConfigModule.forRoot(),
   
    HttpModule,
    DatabaseModule,
    MulterModule.register({
      dest: 'uploads/',
    }),
  ],
  controllers: [MessageController],
  providers: [],
})
export class AppModule {}
