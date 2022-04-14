import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InvoiceEntity } from 'src/invoices/invoice.entity';
import { ClientEntity } from './client.entity';
import { CreateClientDTO } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
    
    @InjectRepository(ClientEntity)
    private clientsRepository: Repository<ClientEntity>

    @InjectRepository(InvoiceEntity)
    private invoicesRepository: Repository<InvoiceEntity>

    findAll(): Promise<ClientEntity[]> {
        return this.clientsRepository.find();
    }

    async findByUserId(userId: string, params: {
        skip?: number, 
        limit?: number, 
        sortBy?: string, 
        sort?: "ASC" | "DESC"
    }) {
        // const { limit, skip, sortBy, sort } = params;
        // const basicOrderOptions: {
        //     name?: "ASC" | "DESC" | 1 | -1,
        //     contactName?: "ASC" | "DESC" | 1 | -1,
        // } = sortBy ? {
        //     [sortBy]: sort
        // } : {};

        
        const clientIdsOfThisUserIdQuery = this.clientsRepository.createQueryBuilder('client')
            .select("client.id")
            .where("client.userId = :userId", { userId })

        const invoiceTotalByClientIdQuery = this.invoicesRepository
            .createQueryBuilder('invoiceTotals')
            .select("SUM(invoiceTotals.total)", "totalBilled")
            .addSelect("COUNT(invoiceTotals.id)", "countInvoices")
            .addSelect("invoiceTotals.clientId", "clientId")
            .where(`invoiceTotals.clientId IN (${clientIdsOfThisUserIdQuery.getQuery()})`)
            .groupBy('clientId')

        const clientListQuery = this.clientsRepository
            .createQueryBuilder('client')
            .where("client.userId = :userId", { userId: userId} )
            .leftJoinAndSelect(`(${invoiceTotalByClientIdQuery.getQuery()})`, 'invoiceTotals', 'invoiceTotals.clientId = clientId')

        const results = await clientListQuery.getRawMany();

        return results.map(({clientId, invoiceTotals_id, ...rest}) => {
            return Object.keys(rest).reduce((acc: Record<string, any>, key) => {
                if (key.startsWith('client_') ) {
                    acc[key.replace('client_', '')] = rest[key];
                } else {
                    acc[key] = rest[key]
                }
                return acc;
            }, {})
        });
    }

    findByUserIdSummary(userId: string) {
        return this.clientsRepository.find({
            where: {
                userId
            },
            select: ['name','contactName', 'id']
        });
    }
 
    async create(createClientDTO: CreateClientDTO, userId: string) {
        const newClient = await this.clientsRepository.create()
        newClient.contactName = createClientDTO.contactName;
        newClient.contactEmail = createClientDTO.contactEmail;
        newClient.name = createClientDTO.name;
        newClient.address = createClientDTO.address;
        newClient.iban = createClientDTO.iban;
        newClient.taxCode = createClientDTO.taxCode;
        newClient.userId = userId;
        await this.clientsRepository.save(newClient)
        return newClient;
    }
}
