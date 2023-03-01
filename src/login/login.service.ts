import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Client } from 'pg';
import * as process from 'process';

import { AuthLoginDto } from './dto/auth-login.dto';

@Injectable()
export class LoginService {
  constructor(private jwtService: JwtService) {}

  async login(authLoginDto: AuthLoginDto) {
    const client = new Client({
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
    });
    await client.connect();

    const { email, password } = authLoginDto;

    client.query(
      'SELECT * FROM users WHERE email = $1',
      [email],
      (err, res) => {
        if (err) console.error(err);
        client.end();
        bcrypt.compare(password, res.rows[0].password, (err, result) => {
          if (err) {
            console.error(err);
            throw new UnauthorizedException();
          }
          if (result) {
            const payload = { email };
            const accessToken = this.jwtService.sign(payload);
            return { accessToken };
          }
        });
      },
    );
  }
}
