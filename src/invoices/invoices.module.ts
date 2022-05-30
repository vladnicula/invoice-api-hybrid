import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './invoice.entity';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { InvoicesResolver } from './invoices.resolver';
import { ClientEntity } from 'src/clients/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceEntity]),
    TypeOrmModule.forFeature([ClientEntity]),
  ],
  providers: [InvoicesService, InvoicesResolver],
  controllers: [InvoicesController],
  exports: [InvoicesService, InvoicesResolver],
})
export class InvoicesModule {}
