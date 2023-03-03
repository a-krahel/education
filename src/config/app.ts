import * as process from 'process';

import { Users } from '../users/users.model';

const env = process.env;

export default () => ({
  database: {
    database: env.DB_DATABASE,
    dialect: env.DB_DIALECT,
    host: env.DB_HOST,
    models: [Users],
    password: env.DB_PASSWORD,
    port: parseInt(env.DB_PORT),
    username: env.DB_USER,
  },
  jwt: {
    secret: 'topSecret51',
    signOptions: {
      expiresIn: env.JWT_LIFETIME,
    },
  },
  port: parseInt(env.NODE_PORT) || 3000,
});
