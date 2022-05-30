import faker from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { ClientsService } from 'src/clients/clients.service';
import { CreateClientDTO } from 'src/clients/dto/create-client.dto';
import {
  CreateInvoiceDTO,
  CreateInvoiceItemsDTO,
} from 'src/invoices/dto/create-invoice.dto';
import { InvoicesService } from 'src/invoices/invoices.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

const ANA_USER = {
  email: `ana.user@test.com`,
  firstName: 'Ana',
  lastName: 'Popescu',
  password: 'Test01$',
};

const VLAD_USER = {
  email: `vlad.user@test.com`,
  firstName: 'Vlad',
  lastName: 'Nicula',
  password: 'Test01$',
};

@Injectable()
export class InvoiceAppSeederService {
  constructor(
    private readonly invoicesService: InvoicesService,
    private readonly clientsService: ClientsService,
    private readonly usersService: UsersService,
  ) {}

  private async createUser(params: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const newUser = new CreateUserDTO(params);
    const createdUser = await this.usersService.create(newUser);
    const randomLength = Math.random() * 30;
    for (let i = 0; i < randomLength; i += 1) {
      await this.createClient(createdUser.id);
    }

    return createdUser;
  }

  private async createClient(userId: string) {
    const createdClient = await this.clientsService.create(
      userId,
      new CreateClientDTO({
        name: faker.company.companyName(),
        contactEmail: faker.internet.email(),
        contactName: faker.name.findName(),
        taxCode: faker.finance.bic(),
        iban: faker.finance.iban(),
        address: `${faker.address.streetAddress()}, ${faker.address.city()} ${faker.address.country()}`,
      }),
    );
    const randomLength = Math.random() * 30;
    for (let i = 0; i < randomLength; i += 1) {
      await this.createInvoice(userId, createdClient.id);
    }
  }

  private async createInvoice(userId: string, clientId: string) {
    const newInvoiceDTO = new CreateInvoiceDTO({
      clientId,
      dateTS: faker.date.recent().getTime().toString(),
      dueDateTS: faker.date.soon().getTime().toString(),
      items: [],
    });

    Array.from({ length: Math.random() * 6 }).forEach(() => {
      newInvoiceDTO.items.push(
        new CreateInvoiceItemsDTO({
          description: faker.commerce.productDescription(),
          price: parseFloat(faker.commerce.price()),
        }),
      );
    });

    return await this.invoicesService.create(userId, newInvoiceDTO);
  }

  async cleanup() {
    // remove all for now
    await this.usersService.removeAll();

    // await this.usersService.removeByEmail(ANA_USER.email);
    // await this.usersService.removeByEmail(VLAD_USER.email);
  }

  async seed() {
    this.cleanup();

    const newUser = await this.createUser(ANA_USER);
    const newUser2 = await this.createUser(VLAD_USER);

    return {
      users: [newUser, newUser2],
    };
  }
}
