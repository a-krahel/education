import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersController } from './users.controller';
import { Users } from './users.model';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  imports: [SequelizeModule.forFeature([Users])],
  providers: [UsersService],
})
export class UsersModule {}
