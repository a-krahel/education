import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as process from 'process';
import { Sequelize } from 'sequelize';

import { Users } from '../users/users.model';
import configuration from './../config/app';

const env = process.env;

const config = configuration().database;
let dbConnection;

@Injectable()
export class DbService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}

  getDbConnection() {
    if (dbConnection) return dbConnection;

    /**Sequelize connection pool*/
    const sequelize = new Sequelize();
    /*const sequelize = new Sequelize(
      env.DB_DATABASE,
      env.DB_USER,
      env.DB_PASSWORD,
      {
        dialect: 'postgres',
        host: env.DB_HOST,
        logging: console.log,
        pool: config.connectionPool,
      },
      /!* config.database,
      config.username,
      config.password,
      {
        // dialect: config.dialect as Dialect,
        dialect: 'postgres',
        host: config.host,
        pool: config.connectionPool,
      },*!/
    );*/

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });

    dbConnection = sequelize;
  }

  GetAll;
}
