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

    async findByUserIdAndId(userId: string, id: string) {
        return this.clientsRepository.findOne({
            where: {
                userId,
                id
            }
        });
    }

    async findByUserId(userId: string, params: {
        skip?: number, 
        limit?: number, 
        sortBy?: string, 
        sort?: "ASC" | "DESC",
        selectFields?: (keyof ClientEntity)[]
    }) {
        const { sortBy, sort, skip, limit } = params;
        let clientIdsOfThisUserIdQuery = this.clientsRepository.createQueryBuilder('client')
            .select("client.id")
            .where("client.userId = :userId", { userId })

        const invoiceTotalByClientIdQuery = this.invoicesRepository
            .createQueryBuilder('invoiceTotals')
            .select("SUM(invoiceTotals.total)", "totalBilled")
            .addSelect("COUNT(invoiceTotals.id)", "invoiceCount")
            .addSelect("invoiceTotals.clientId", "clientId")
            .where(`invoiceTotals.clientId IN (${clientIdsOfThisUserIdQuery.getQuery()})`)
            .groupBy('clientId')

        let clientListQuery = this.clientsRepository
            .createQueryBuilder('client')
            .where("client.userId = :userId", { userId: userId} )
            .groupBy('client.id')

        if ( sortBy === 'name' || sortBy === 'contactName' ) {
            clientListQuery = clientListQuery
                .orderBy(`client.${sortBy}`, sort ?? "ASC")
        }

        clientListQuery = clientListQuery.leftJoinAndSelect(
            `(${invoiceTotalByClientIdQuery.getQuery()})`, 
            'invoiceTotals', 
            'invoiceTotals.clientId = client.id'
        )
           
        if ( sortBy === 'invoiceCount' || sortBy === 'totalBilled' ) {
            clientListQuery = clientListQuery
                .orderBy(`invoiceTotals.${sortBy}`, sort ?? "ASC")
        }

        const totalCount = await clientListQuery.getCount();

        if ( skip !== undefined ) {
            clientListQuery = clientListQuery
                .offset(skip)
        }

        if ( limit !== undefined ) {
            clientListQuery = clientListQuery
                .limit(limit)
        }

        const results = await clientListQuery.getRawMany();

        return {
            total: totalCount,
            skip,
            limit,
            // debugQuery: clientListQuery.getQueryAndParameters(),
            results: results.map(({clientId, invoiceTotals_id, ...rest}) => {
                return Object.keys(rest).reduce((acc: Record<string, any>, key) => {
                    if (key.startsWith('client_') ) {
                        acc[key.replace('client_', '')] = rest[key];
                    } else {
                        acc[key] = rest[key]
                    }
                    return acc;
                }, {})
            })
        };
    }

    findByUserIdSummary(userId: string) {
        return this.clientsRepository.find({
            where: {
                userId
            },
            select: ['name','contactName', 'id']
        });
    }
 
    async create(userId: string, createClientDTO: CreateClientDTO) {
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
