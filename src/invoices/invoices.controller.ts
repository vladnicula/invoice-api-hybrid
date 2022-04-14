import { Body, Controller, Get, Post, Res, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';

import { InvoicesService } from './invoices.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('invoices')
@Controller('invoices')
export class InvoicesController {
    constructor(
        private readonly invoicesService: InvoicesService,
    ) {}

    @Get('/')
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
