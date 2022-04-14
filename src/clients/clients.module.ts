import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { InvoiceEntity } from 'src/invoices/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity]), TypeOrmModule.forFeature([InvoiceEntity])],
  controllers: [ClientsController],
  providers: [ClientsService]
})
export class ClientsModule {}
