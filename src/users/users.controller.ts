import { Body, Controller, Get, Param, Put, Req, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response, Request } from 'express';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller("users")
@ApiTags("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/list')
    async getUsers(@Res() res: Response) {
        const users = await this.usersService.findAll();
        return res.json({users, total: users.length});
    }

    @Put('/')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: UpdateUserDTO })
    async updateUser(@Res() res: Response, @Body() updateUserDTO: UpdateUserDTO) {
        const user = await this.usersService.update(updateUserDTO)
        return res.json({user});
    }

    @Get('profile')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    getProfile(@Req() req: Request) {
      return req.user;
    }
} 
