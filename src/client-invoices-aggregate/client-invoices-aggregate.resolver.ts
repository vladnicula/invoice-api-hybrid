import { UseGuards } from '@nestjs/common';
import * as queryFields from 'graphql-fields';
import {
  Args,
  Info,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Mutation,
} from '@nestjs/graphql';
import { GraphQLCurrentUser } from 'src/auth/decorators/graphql-current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { ClientEntity, ClientListInfo } from 'src/clients/client.entity';
import { ClientsService } from 'src/clients/clients.service';
import { SortOrder } from 'src/common/entity/graphql-sort-order';
import { InvoiceEntity, InvoiceListInfo } from 'src/invoices/invoice.entity';
import { InvoicesService } from 'src/invoices/invoices.service';

@UseGuards(GqlAuthGuard)
@Resolver((of) => ClientEntity)
export class ClientInvoicesAggregateResolver {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly invoicesService: InvoicesService,
  ) {}

  @Query((returns) => ClientEntity)
  async client(
    @GraphQLCurrentUser() user: { id: string },
    @Args('id', { type: () => String }) id: string,
  ) {
    return await this.clientsService.findByUserIdAndId(user.id, id);
  }

  @Query((returns) => ClientListInfo)
  async clients(
    @GraphQLCurrentUser() user: { id: string },
    @Info() queryInfo,
    @Args('limit', { type: () => Int, nullable: false, defaultValue: 10 })
    limit: number,
    @Args('skip', { type: () => Int, nullable: false, defaultValue: 0 })
    skip: number,
    @Args('sort', { type: () => SortOrder, nullable: true }) sort?: SortOrder,
    @Args('sortBy', { type: () => String, nullable: true }) sortBy?: string,
  ) {
    const clientSelectFields = Object.keys(
      queryFields(queryInfo).results,
    ) as (keyof ClientEntity)[];
    const clients = await this.clientsService.findByUserId(user.id, {
      limit,
      skip,
      sort,
      sortBy,
      selectFields: clientSelectFields,
    });
    return clients;
  }

  @ResolveField((type) => InvoiceListInfo)
  async invoices(
    @Parent() parent: ClientEntity,
    @GraphQLCurrentUser() user: { id: string },
    @Info() queryInfo,
    @Args('limit', { type: () => Int, nullable: false, defaultValue: 10 })
    limit: number,
    @Args('sort', { type: () => SortOrder, nullable: true }) sort?: SortOrder,
    @Args('sortBy', { type: () => String, nullable: true }) sortBy?: string,
    @Args('startDate', { type: () => String, nullable: true })
    startDate?: string,
    @Args('endDate', { type: () => String, nullable: true }) endDate?: string,
  ) {
    const invoiceSelectFields = Object.keys(
      queryFields(queryInfo),
    ) as (keyof InvoiceEntity)[];
    const invoices = await this.invoicesService.findByUserId(user.id, {
      limit,
      skip: 0,
      sort,
      sortBy,
      startDate,
      endDate,
      clientId: parent.id,
      selectFields: invoiceSelectFields,
    });

    return invoices.results;
  }

  @Mutation((returns) => Boolean)
  async createClient(
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'contactName', type: () => String }) contactName: string,
    @Args({ name: 'contactEmail', type: () => String }) contactEmail: string,
    @Args({ name: 'taxCode', type: () => String }) taxCode: string,
    @Args({ name: 'iban', type: () => String }) iban: string,
    @Args({ name: 'address', type: () => String }) address: string,
    @GraphQLCurrentUser() user: { id: string },
  ) {
    await this.clientsService.create(user.id, {
      name,
      contactName,
      contactEmail,
      taxCode,
      iban,
      address,
    });
    return true;
  }
}
