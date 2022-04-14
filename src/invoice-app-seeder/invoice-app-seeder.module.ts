import { Module } from '@nestjs/common';
import { InvoiceAppSeederService } from './invoice-app-seeder.service';
import { InvoiceAppSeederController } from './invoice-app-seeder.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [InvoiceAppSeederService],
  controllers: [InvoiceAppSeederController],
  imports: [ClientsModule, InvoicesModule, UsersModule]
})
export class InvoiceAppSeederModule {}
