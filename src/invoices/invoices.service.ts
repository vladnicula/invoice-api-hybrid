import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/clients/client.entity';
import { FindManyOptions, getManager, Repository } from 'typeorm';
import { CreateInvoiceDTO } from './dto/create-invoice.dto';
import { InvoiceItemEntity } from './invoice-item.entity';
import { InvoiceEntity } from './invoice.entity';

@Injectable()
export class InvoicesService {
  @InjectRepository(InvoiceEntity)
  private invoicesRepository: Repository<InvoiceEntity>;

  @InjectRepository(ClientEntity)
  private clientsRepository: Repository<ClientEntity>;

  findAll(): Promise<InvoiceEntity[]> {
    return this.invoicesRepository.find();
  }

  async findById(id: string) {
    return this.invoicesRepository.findOne(id);
  }

  async findByUserIdAndId(userId: string, id: string) {
    return this.invoicesRepository.findOne({
      where: {
        id,
        userId,
      },
    });
  }

  async findByUserId(
    userId: string,
    params: {
      skip?: number;
      limit?: number;
      sort?: 'ASC' | 'DESC';
      sortBy?: string;
      startDate?: string;
      endDate?: string;
      clientId?: string;
      selectFields?: (keyof InvoiceEntity)[];
    },
  ) {
    const {
      skip = 0,
      limit = 100,
      sort,
      sortBy,
      startDate,
      endDate,
      clientId,
      selectFields,
    } = params;

    let invoicListingQuery = this.invoicesRepository
      .createQueryBuilder('invoices')
      .select('invoices.id', 'id')
      .addSelect('invoices.date', 'date')
      .addSelect('invoices.dueDate', 'dueDate')
      .addSelect('invoices.total', 'total')
      .addSelect('clients.name', 'companyName')
      .addSelect('clients.id', 'clientId')
      .addSelect('clients.contactName', 'contactName')
      .addSelect('clients.contactEmail', 'contactEmail')
      .where('invoices.userId = :userId', { userId: userId });

    if (startDate) {
      invoicListingQuery = invoicListingQuery.andWhere(
        'invoices.date >= :startDate',
        { startDate },
      );
    }

    if (endDate) {
      invoicListingQuery = invoicListingQuery.andWhere(
        'invoices.date < :endDate',
        { endDate },
      );
    }

    if (clientId) {
      invoicListingQuery = invoicListingQuery.andWhere(
        'invoices.clientId = :clientId',
        { clientId },
      );
    }

    invoicListingQuery = invoicListingQuery.leftJoin(
      'client_entity',
      'clients',
      'clients.id=invoices.clientId',
    );

    const totalMatches = await invoicListingQuery.getCount();

    invoicListingQuery = invoicListingQuery.offset(skip).limit(limit);

    if (sortBy) {
      invoicListingQuery = invoicListingQuery.orderBy(sortBy, sort);
    }

    return {
      results: await invoicListingQuery.getRawMany(),
      total: totalMatches,
      skip,
      limit,
    };
  }

  async create(userId: string, createInvoiceDTO: CreateInvoiceDTO) {
    let newInvoice: InvoiceEntity;
    await getManager().transaction(async (transactionalEntityManager) => {
      newInvoice = await transactionalEntityManager.create(InvoiceEntity);
      newInvoice.userId = userId;
      newInvoice.clientId = createInvoiceDTO.clientId;
      newInvoice.date = createInvoiceDTO.dateTS;
      newInvoice.dueDate = createInvoiceDTO.dueDateTS;
      newInvoice.total = createInvoiceDTO.items.reduce((acc, item) => {
        return acc + item.price;
      }, 0);
      await transactionalEntityManager.save(newInvoice);
      for (let i = 0; i < createInvoiceDTO.items.length; i += 1) {
        const itItem = createInvoiceDTO.items[i];
        const invoiceItem = await transactionalEntityManager.create(
          InvoiceItemEntity,
        );
        invoiceItem.description = itItem.description;
        invoiceItem.price = itItem.price;
        invoiceItem.invoiceId = newInvoice.id;
        await transactionalEntityManager.save(invoiceItem);
      }
      await transactionalEntityManager.save(newInvoice);
    });

    return newInvoice;
  }

  async getClientOfInvoiceByUserIdAndInvoiceId(
    userId: string,
    invoiceId: string,
  ) {
    return (
      await this.invoicesRepository.findOneOrFail({
        select: ['id', 'client'],
        relations: ['client'],
        where: {
          userId,
          id: invoiceId,
        },
      })
    ).client;
  }

  async getItemsOfInvoiceByUserIdAndInvoiceId(
    userId: string,
    invoiceId: string,
  ) {
    return (
      await this.invoicesRepository.findOneOrFail({
        select: ['id', 'items'],
        relations: ['items'],
        where: {
          userId,
          id: invoiceId,
        },
      })
    ).items;
  }
}
