import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import * as process from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/app';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { UsersController } from './users/users.controller';
import { Users } from './users/users.model';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  controllers: [AppController, UsersController, LoginController],
  imports: [
    // TODO: fix import from config file
    // SequelizeModule.forRoot(configuration().database),
    SequelizeModule.forRoot({
      database: process.env.DB_DATABASE,
      dialect: 'postgres',
      host: process.env.DB_HOST,
      models: [Users],
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.development.env', '.local.env'],
      load: [configuration],
    }),
    UsersModule,
    LoginModule,
    JwtModule,
  ],
  providers: [AppService, UsersService, LoginService],
})
export class AppModule {}
