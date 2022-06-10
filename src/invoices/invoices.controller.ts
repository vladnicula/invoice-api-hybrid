import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Req,
  UseGuards,
  Query,
  Param,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/rest-jwt-auth.guard';

import { SortOrder } from 'src/common/entity/graphql-sort-order';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';

import { InvoicesService } from './invoices.service';

export enum SortBy {
  Date = 'date',
  DueDate = 'dueDate',
  Total = 'total',
  CompanyName = 'companyName',
}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get('/')
  @ApiQuery({ name: 'limit', type: 'string', required: false })
  @ApiQuery({ name: 'skip', type: 'string', required: false })
  @ApiQuery({ name: 'startDate', type: 'string', required: false })
  @ApiQuery({ name: 'endDate', type: 'string', required: false })
  @ApiQuery({ name: 'clientId', type: 'string', required: false })
  @ApiQuery({ name: 'sortBy', enum: SortBy, required: false })
  @ApiQuery({ name: 'sort', enum: SortOrder, required: false })
  async getInvoices(
    @Req() req: Request,
    @Res() res: Response,
    @Query('skip') skip?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
    @Query('sortBy') sortBy?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('clientId') clientId?: string,
  ) {
    // TODO I don't have time to learn proper validation layer stuff, so I'm gonna parse things here
    const parsedSkip = skip ? parseInt(skip, 10) : 0;
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    const parsedSort = sort === 'ASC' ? 'ASC' : 'DESC';

    const userId = (req.user as { id: string }).id;
    const results = await this.invoicesService.findByUserId(userId, {
      skip: parsedSkip,
      limit: parsedLimit,
      sort: parsedSort,
      sortBy,
      startDate,
      endDate,
      clientId,
    });
    return res.json(results);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  async getClient(@Param('id') id, @Req() req: Request, @Res() res: Response) {
    const userId = (req.user as { id: string }).id;
    const response = await this.invoicesService.findByUserIdAndId(userId, id);
    return res.json(response);
  }

  @Post('/')
  @ApiBody({ type: CreateInvoiceDTO })
  async createInvoice(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createInvoiceDTO: CreateInvoiceDTO,
  ) {
    const userId = (req.user as { id: string }).id;
    const invoice = await this.invoicesService.create(userId, createInvoiceDTO);
    return res.json({ invoice });
  }
}
