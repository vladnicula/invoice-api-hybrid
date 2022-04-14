import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

import { Request, Response } from 'express'
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { UserLoginDetailsDTO } from './dto/user-login-details.dto';
import { UserSignUpDetailsDTO } from './dto/user-sign-up-details.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(
      private readonly authService: AuthService, 
      private readonly usersService: UsersService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiBody({ type: UserLoginDetailsDTO })
    async login(@Req() req: Request) {
      // force cast as we know we get the right thing from the LocalAuthGuard
      return this.authService.login(req.user as UserEntity)
    }

    @Post('sign-up')
    @ApiBody({ type: UserSignUpDetailsDTO })
    async signUp(@Res() res: Response, @Body() userSignUpDetailsDTO: UserSignUpDetailsDTO) {
      const user = await this.usersService.update(userSignUpDetailsDTO)
      return res.json({user});
    }
}
