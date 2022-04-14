import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Response, Request } from 'express'
import { CreateClientDTO } from './dto/create-client.dto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('clients')
@Controller('clients')
export class ClientsController {

    constructor(private readonly  clientsService: ClientsService) {}

    @Get('/')
    async getClients(
        @Req() req: Request, 
        @Res() res: Response
    ) {
        const userId = (req.user as {id: string}).id;
        const clients = await this.clientsService.findByUserId(userId);
        return res.json({clients, total: clients.length});
    }
    
    @Post('/')
    @ApiBody({ type: CreateClientDTO })
    async createClient(@Req() req: Request, @Res() res: Response, @Body() createClientDTO: CreateClientDTO) {
        const userId = (req.user as {id: string}).id;
        const client = await this.clientsService.create(createClientDTO, userId)
        return res.json({client});
    }
}
