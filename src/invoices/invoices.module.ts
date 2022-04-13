import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './invoice.entity';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity])],
  providers: [InvoicesService],
  controllers: [InvoicesController]
})
export class InvoicesModule {}
