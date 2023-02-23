import { Body, Controller, Post } from '@nestjs/common';

import { AuthLoginDto } from './dto/auth-login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('')
  login(@Body() authLoginDto: AuthLoginDto): any {
    return this.loginService.login(authLoginDto);
  }
}
