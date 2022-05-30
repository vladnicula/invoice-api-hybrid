import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InvoiceAppSeederService } from './invoice-app-seeder.service';

@ApiTags('seeder')
@Controller('invoice-app-seeder')
export class InvoiceAppSeederController {
  constructor(private readonly invoiceAppSeeder: InvoiceAppSeederService) {}

  @Post('/')
  async seed() {
    const result = await this.invoiceAppSeeder.seed();
    console.log(result);
  }
}
