import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

import { Request } from 'express'

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request) {
      // force cast as we know we get the right thing from the LocalAuthGuard
      return this.authService.login(req.user as UserEntity)
    }
}
