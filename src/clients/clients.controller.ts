import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Response, Request } from 'express';
import { CreateClientDTO } from './dto/create-client.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/rest-jwt-auth.guard';
import { SortOrder } from 'src/common/entity/graphql-sort-order';

export enum SortOptions {
  Name = 'name',
  ContactName = 'contactName',
  InvoiceCount = 'invoiceCount',
  TotalBilled = 'totalBilled',
}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get('/')
  @ApiQuery({ name: 'limit', type: 'string', required: false })
  @ApiQuery({ name: 'skip', type: 'string', required: false })
  @ApiQuery({ name: 'sortBy', enum: SortOptions, required: false })
  @ApiQuery({ name: 'sort', enum: SortOrder, required: false })
  async getClients(
    @Req() req: Request,
    @Res() res: Response,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sort') sort?: string,
  ) {
    const userId = (req.user as { id: string }).id;

    // TODO I don't have time to learn proper validation layer stuff, so I'm gonna parse things here
    const parsedSkip = skip ? parseInt(skip, 10) : 0;
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    const parsedSort = sort === 'ASC' ? 'ASC' : 'DESC';

    const response = await this.clientsService.findByUserId(userId, {
      skip: parsedSkip,
      limit: parsedLimit,
      sort: parsedSort,
      sortBy,
    });
    return res.json(response);
  }

  @Post('/')
  @ApiBody({ type: CreateClientDTO })
  async createClient(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createClientDTO: CreateClientDTO,
  ) {
    const userId = (req.user as { id: string }).id;
    const client = await this.clientsService.create(userId, createClientDTO);
    return res.json({ client });
  }

  @Get('/names')
  async getSummary(@Req() req: Request, @Res() res: Response) {
    const userId = (req.user as { id: string }).id;
    const clients = await this.clientsService.findByUserIdSummary(userId);
    return res.json({ clients });
  }
}
