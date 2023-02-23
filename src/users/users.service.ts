import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Client } from 'pg';
import * as process from 'process';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async getUsers() {
    const client = new Client({
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
    });
    await client.connect();

    client.query('SELECT * FROM users', (err, res) => {
      if (err) console.error(err);
      client.end();
      // eslint-disable-next-line no-console
      console.log(res.rows);
    });
  }

  async getUser(id: string) {
    const client = new Client({
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
    });
    await client.connect();

    client.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
      if (err) console.error(err);
      client.end();
      // eslint-disable-next-line no-console
      console.log(res.rows);
    });
  }
  async createUser(createUsersDto: CreateUserDto) {
    const client = new Client({
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
    });
    await client.connect();

    const { email, password } = createUsersDto;
    const hashPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT),
    );

    client.query(
      `INSERT INTO users (email, password) VALUES ($1, $2)`,
      [email, hashPassword],
      (err) => {
        if (err) console.error(err);
        client.end();
      },
    );
  }
}
