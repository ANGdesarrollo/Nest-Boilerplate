import { Module } from '@nestjs/common';
import { UserModule } from './Modules/User/user.module';
import { ConfigModule } from '@nestjs/config';
import { env } from './Config/enviroment-variables';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [env]
    }),
    MongooseModule.forRoot("mongodb://localhost:27017/nest-boilerplate"),
    UserModule
  ]
})
export class AppModule {}
