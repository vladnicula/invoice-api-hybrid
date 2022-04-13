import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

import { Request } from 'express'
import { ApiBody } from '@nestjs/swagger';

import { UserLoginDetailsDTO } from './dto/user-login-details.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: UserLoginDetailsDTO })
    async login(@Req() req: Request) {
      // force cast as we know we get the right thing from the LocalAuthGuard
      return this.authService.login(req.user as UserEntity)
    }
}
