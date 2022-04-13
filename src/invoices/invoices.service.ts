import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { InvoiceEntity } from './invoice.entity';

@Injectable()
export class InvoicesService {

    @InjectRepository(InvoiceEntity)
    private invoicesRepository: Repository<InvoiceEntity>

    findAll(): Promise<InvoiceEntity[]> {
        return this.invoicesRepository.find();
    }

    async create(createInvoiceDTO: CreateInvoiceDTO, userId: string) {
        const newInvoice = await this.invoicesRepository.create()
        newInvoice.userId = userId;
        newInvoice.clientId = createInvoiceDTO.clientId;
        newInvoice.date = createInvoiceDTO.date;
        newInvoice.dueDate = createInvoiceDTO.dueDate;
        newInvoice.items = createInvoiceDTO.items;
        newInvoice.total = createInvoiceDTO.total;
        await this.invoicesRepository.save(newInvoice)
        return newInvoice;
    }
}
