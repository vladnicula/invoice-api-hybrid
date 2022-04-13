import { Controller, Get, HttpCode, Request, Param, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Response, Request as ExpressRequest } from 'express';

import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { User } from './users/user.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  @HttpCode(200)
  getHello(@Res() res: Response, @Query('TEST_ID') testId: string) {
    return res.json(this.appService.getHello(testId));
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: ExpressRequest) {
    // force cast as we know we get the right thing from the LocalAuthGuard
    return this.authService.login(req.user as User)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
} 
