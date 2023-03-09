import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { Users } from '../users/users.model';
import { DbController } from './db.controller';
import { DbService } from './db.service';

@Module({
  controllers: [DbController],
  imports: [SequelizeModule.forFeature([Users])],
  providers: [DbService],
})
export class DbModule {}
