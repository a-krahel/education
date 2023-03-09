import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import * as process from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/app';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { UsersController } from './users/users.controller';
import { Users } from './users/users.model';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

const config = configuration().database;

@Module({
  controllers: [AppController, UsersController, LoginController],
  imports: [
    // TODO: fix import from config file
    // SequelizeModule.forRoot(configuration().database as SequelizeModuleOptions),
    SequelizeModule.forRoot({
      database: process.env.DB_DATABASE,
      // dialect: config.dialect,
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
    DbModule,
    JwtModule,
  ],
  providers: [AppService, UsersService, LoginService, DbService],
})
export class AppModule {}

/*{
      database: config.database,
      // dialect: config.dialect,
      dialect: 'postgres',
      host: config.host,
      models: config.models,
      password: config.password,
      port: config.port,
      username: config.username,
    }*/
