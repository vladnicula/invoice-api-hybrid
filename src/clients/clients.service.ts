import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientEntity } from './client.entity';
import { CreateClientDTO } from './dto/create-client-dto';

@Injectable()
export class ClientsService {
    
    @InjectRepository(ClientEntity)
    private clientsRepository: Repository<ClientEntity>

    findAll(): Promise<ClientEntity[]> {
        return this.clientsRepository.find();
    }

    async create(createClientDTO: CreateClientDTO) {
        const newClient = await this.clientsRepository.create()
        newClient.contactName = createClientDTO.contactName;
        newClient.contactEmail = createClientDTO.contactEmail;
        newClient.name = createClientDTO.name;
        newClient.address = createClientDTO.address;
        newClient.iban = createClientDTO.iban;
        newClient.taxCode = createClientDTO.taxCode;
        await this.clientsRepository.save(newClient)
        return newClient;
    }
}
