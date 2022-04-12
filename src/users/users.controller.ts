import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/users')
    @HttpCode(200)
    async getUsers(@Res() res: Response) {
        const users = await this.usersService.findAll();
        return res.json({users, total: users.length});
    }
} 
