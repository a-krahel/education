import * as process from 'process';

const env = process.env;
export default () => ({
  database: {
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
    user: env.DB_USER,
  },
  port: parseInt(env.NODE_PORT) || 3000,
});
