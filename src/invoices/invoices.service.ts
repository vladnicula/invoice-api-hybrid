import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { InvoiceItemEntity } from './invoice-item.entity';
import { InvoiceEntity } from './invoice.entity';

@Injectable()
export class InvoicesService {

    @InjectRepository(InvoiceEntity)
    private invoicesRepository: Repository<InvoiceEntity>

    findAll(): Promise<InvoiceEntity[]> {
        return this.invoicesRepository.find();
    }

    findByUserId(userId: string) {
        return this.invoicesRepository.find({
            where: {
                userId: userId
            }
        });
    }

    async create(createInvoiceDTO: CreateInvoiceDTO, userId: string) {
        let newInvoice: InvoiceEntity;
        await getManager().transaction(async (transactionalEntityManager) => {
            newInvoice = await transactionalEntityManager.create(InvoiceEntity)
            newInvoice.userId = userId;
            newInvoice.clientId = createInvoiceDTO.clientId;
            newInvoice.date = createInvoiceDTO.dateTS;
            newInvoice.dueDate = createInvoiceDTO.dueDateTS;
            
            await transactionalEntityManager.save(newInvoice)
            let total = 0;
            for ( let i = 0; i < createInvoiceDTO.items.length; i += 1 ) {
                const itItem = createInvoiceDTO.items[i];
                const invoiceItem = await transactionalEntityManager.create(InvoiceItemEntity)
                invoiceItem.description = itItem.description
                invoiceItem.price = itItem.price
                invoiceItem.invoiceId = newInvoice.id;
                total += invoiceItem.price;
                await transactionalEntityManager.save(invoiceItem)
            }

            newInvoice.total = total;
            await transactionalEntityManager.save(newInvoice)
        })
        
        return newInvoice;
    }
}
