import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.interface';


@Controller('users')
export class UserController {
  constructor(private userService: UserService) { }

  @Post()
  create(@Body() task: User): Promise<User> {
    return this.userService.create(task);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOneUser(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() data: User): Promise<User> {
    return this.userService.update(id, data)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.userService.remove(id);
  }
}
