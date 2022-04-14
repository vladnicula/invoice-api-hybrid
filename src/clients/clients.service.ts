import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';
import { SortOptions } from './clients.controller';
import { CreateClientDTO } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
    
    @InjectRepository(ClientEntity)
    private clientsRepository: Repository<ClientEntity>

    findAll(): Promise<ClientEntity[]> {
        return this.clientsRepository.find();
    }

    findByUserId(userId: string, params: {
        skip?: number, 
        limit?: number, 
        sortBy?: string, 
        sort?: "ASC" | "DESC"
    }) {
        const { limit, skip, sortBy, sort } = params;
        const basicOrderOptions: {
            name?: "ASC" | "DESC" | 1 | -1,
            contactName?: "ASC" | "DESC" | 1 | -1,
        } = sortBy ? {
            [sortBy]: sort
        } : {};
        
        return this.clientsRepository.find({
            where: {
                userId
            },
            skip,
            take: limit,
            order: basicOrderOptions
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
