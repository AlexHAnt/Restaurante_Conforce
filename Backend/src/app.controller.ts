import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.userId
    const getUserData = await this.userService.findOneUser(userId)
    const result = { userId: getUserData['userId'], username: getUserData['username'], accesslevel: getUserData['accesslevel'] }
    return result
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
