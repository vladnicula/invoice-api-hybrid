import { Module } from '@nestjs/common';
import { ClientsModule } from 'src/clients/clients.module';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { ClientInvoicesAggregateResolver } from './client-invoices-aggregate.resolver';

@Module({
  imports: [ClientsModule, InvoicesModule],
  providers: [ClientInvoicesAggregateResolver],
})
export class ClientInvoicesAggregateModule {}
