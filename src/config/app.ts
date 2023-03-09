import * as process from 'process';

import { Users } from '../users/users.model';

const env = process.env;

export default () => ({
  database: {
    connectionPool: {
      acquire: 30000,
      idle: 10000,
      max: 5,
      min: 0,
    },
    database: env.DB_DATABASE,
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
    models: [Users],
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
  },
  jwt: {
    secret: env.JWT_SECRET,
    signOptions: {
      expiresIn: env.JWT_LIFETIME,
    },
  },
  port: parseInt(env.NODE_PORT) || 3000,
});
