import { Body, Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';

import { InvoicesService } from './invoices.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('invoices')
export class InvoicesController {
    constructor(
        private readonly invoicesService: InvoicesService,
    ) {}

    @Get('/')
    async getInvoices(@Res() res: Response) {
        const invoices = await this.invoicesService.findAll();
        return res.json({invoices, total: invoices.length});
    }

    @Post('/')
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
