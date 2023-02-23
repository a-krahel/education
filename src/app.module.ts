import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/app';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  controllers: [AppController, UsersController, LoginController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env', '.local.env'],
      load: [configuration],
    }),
    UsersModule,
    LoginModule,
  ],
  providers: [AppService, UsersService, LoginService],
})
export class AppModule {}
