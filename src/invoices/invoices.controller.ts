import { Body, Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';

import { InvoicesService } from './invoices.service';

export enum SortBy {
    Date = 'date',
    DueDate = 'dueDate',
    Total = 'total'
}

export enum SortOrder {
    ASC='ASC',
    DESC='DESC'
}

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
    constructor(
        private readonly invoicesService: InvoicesService,
    ) {}

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
        @Res() res: Response
    ) {
        const userId = (req.user as {id: string}).id;
        const invoices = await this.invoicesService.findByUserId(userId);
        return res.json({invoices, total: invoices.length});
    }

    @Post('/')
    @ApiBody({ type: CreateInvoiceDTO })
    async createInvoice(
        @Req() req: Request, 
        @Res() res: Response, 
        @Body() createInvoiceDTO: CreateInvoiceDTO
    ) {
        const userId = (req.user as {id: string}).id;
        const invoice = await this.invoicesService.create(createInvoiceDTO, userId)
        return res.json({invoice});
    }
}
