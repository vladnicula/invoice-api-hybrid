import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/users')
    @HttpCode(200)
    async getUsers(@Res() res: Response) {
        const users = await this.usersService.findAll();
        return res.json({users, total: users.length});
    }

    @Post('/users')
    async createUser(@Res() res: Response, @Body() createUserDTO: CreateUserDTO) {
        console.log({createUserDTO})
        const user = await this.usersService.create(createUserDTO)
        return res.json({user});
    }
} 
