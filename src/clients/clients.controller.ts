import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Response } from 'express'
import { CreateClientDTO } from './dto/create-client.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('clients')
export class ClientsController {

    constructor(private readonly  clientsService: ClientsService) {}

    @Get('/')
    async getClients(@Res() res: Response) {
        const clients = await this.clientsService.findAll();
        return res.json({clients, total: clients.length});
    }

    @Post('/')
    async createClient(@Res() res: Response, @Body() createClientDTO: CreateClientDTO) {
        const client = await this.clientsService.create(createClientDTO)
        return res.json({client});
    }
}
