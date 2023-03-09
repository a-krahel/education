import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('')
  getUsers(): any {
    return this.userService.findAll();
    // return this.userService.getUsers();
  }

  @Get('/:id')
  getUser(@Param('id') id: string): any {
    return this.userService.getUser(id);
  }

  @Post('')
  createUser(@Body() createUserDto: CreateUserDto): any {
    return this.userService.createUser(createUserDto);
  }
}
