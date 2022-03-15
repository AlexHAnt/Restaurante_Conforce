import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.interface';
import { Users } from './user.entity';
const bcrypt = require('bcrypt');
const salt = '$2a$10$bxyR3WsRj.HcRWKVh1AbWOQVeEus1iv6Aom.LZyv03Ow00DMEDWCi' //'123'

@Injectable()
export class UserService {
  private users: Users[]

  constructor(
    @InjectRepository(Users)
    private readonly UsersRepository: Repository<Users>,
  ) { }

  create(createTask: User): Promise<Users> {
    const user = new Users();
    const passwordCrypt = bcrypt.hashSync(createTask.password, salt);
    user.username = createTask.username;
    user.accesslevel = createTask.accesslevel;
    user.password = passwordCrypt;
    return this.UsersRepository.save(user);
  }

  async findAll(): Promise<Users[]> {
    return this.UsersRepository.find();
  }

  findOneUser(id: string): Promise<Users> {
    return this.UsersRepository.findOne(id);
  }

  async findOne(username: string): Promise<Users | undefined> {
    this.users = await this.UsersRepository.find()
    return await this.users.find((user: Users) => user.username === username)
  }

  async update(id: number, data: User): Promise<User> {
    const userId = await this.UsersRepository.findOne(id)
    const passwordCrypt = bcrypt.hashSync(data.password, salt)
    return await this.UsersRepository.save(Object.assign(userId, { username: data.username, password: passwordCrypt, accesslevel: data.accesslevel }))
  }


  async remove(id: string): Promise<void> {
    await this.UsersRepository.delete(id);
  }
}
