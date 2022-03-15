import { Injectable } from '@nestjs/common';
import {UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    const salt = '$2a$10$bxyR3WsRj.HcRWKVh1AbWOQVeEus1iv6Aom.LZyv03Ow00DMEDWCi' //'123'
    const teste = bcrypt.hashSync(pass, salt);
    
    if (user && user.password === teste) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}