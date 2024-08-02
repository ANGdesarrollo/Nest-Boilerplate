import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from './Modules/Shared/SharedModule';
import EnvConfig, { EnvSchema } from './Config/EnvConfig';
import { AuthModule } from './Modules/Auth/AuthModule';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
      validationSchema: EnvSchema,
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-boilerplate'),
    AuthModule,
    SharedModule,
  ],
})
export class AppModule {}
