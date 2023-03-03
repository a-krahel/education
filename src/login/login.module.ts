import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import configuration from './../config/app';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  imports: [JwtModule.register(configuration().jwt)],
  providers: [LoginService, JwtService],
})
export class LoginModule {}
