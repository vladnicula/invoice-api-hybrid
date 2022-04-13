import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import { CreateUserDTO } from './dto/create-user.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/users')
    async getUsers(@Res() res: Response) {
        const users = await this.usersService.findAll();
        return res.json({users, total: users.length});
    }

    @Post('/users')
    @ApiBody({ type: CreateUserDTO })
    async createUser(@Res() res: Response, @Body() createUserDTO: CreateUserDTO) {
        console.log({createUserDTO})
        const user = await this.usersService.create(createUserDTO)
        return res.json({user});
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Req() req: Request) {
      return req.user;
    }
} 
