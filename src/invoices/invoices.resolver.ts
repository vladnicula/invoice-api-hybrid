import { UseGuards } from '@nestjs/common';
import {
  Int,
  Args,
  Resolver,
  Query,
  Info,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';

import * as queryFields from 'graphql-fields';

import { GraphQLCurrentUser } from 'src/auth/decorators/graphql-current-user.decorator';
import { GqlAuthGuard } from 'src/auth/guards/graphql-jwt-auth.guard';
import { SortOrder } from 'src/common/entity/graphql-sort-order';
import {
  InvoiceItemEntity,
  InlinedInvoiceItemInput,
} from './invoice-item.entity';

import { InvoiceEntity, InvoiceListInfo } from './invoice.entity';
import { InvoicesService } from './invoices.service';

@UseGuards(GqlAuthGuard)
@Resolver((of) => InvoiceEntity)
export class InvoicesResolver {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Query((returns) => InvoiceEntity)
  async invoice(
    @GraphQLCurrentUser() user: { id: string },
    @Args('id', { type: () => String }) id: string,
  ) {
    return await this.invoicesService.findByUserIdAndId(user.id, id);
  }

  @Query((returns) => InvoiceListInfo)
  async invoices(
    @GraphQLCurrentUser() user: { id: string },
    @Info() queryInfo,
    @Args('limit', { type: () => Int, nullable: false, defaultValue: 10 })
    limit: number,
    @Args('skip', { type: () => Int, nullable: false, defaultValue: 0 })
    skip: number,
    @Args('sort', { type: () => SortOrder, nullable: true }) sort?: SortOrder,
    @Args('sortBy', { type: () => String, nullable: true }) sortBy?: string,
    @Args('startDate', { type: () => String, nullable: true })
    startDate?: string,
    @Args('endDate', { type: () => String, nullable: true }) endDate?: string,
    @Args('clientId', { type: () => String, nullable: true }) clientId?: string,
  ) {
    const invoiceSelectFields = Object.keys(
      queryFields(queryInfo).results,
    ) as (keyof InvoiceEntity)[];
    const invoices = await this.invoicesService.findByUserId(user.id, {
      limit,
      skip,
      sort,
      sortBy,
      startDate,
      endDate,
      clientId,
    });
    return invoices;
  }

  @ResolveField()
  async client(
    @Parent() invoice: InvoiceEntity,
    @GraphQLCurrentUser() user: { id: string },
    @Info() queryInfo,
  ) {
    const client =
      await this.invoicesService.getClientOfInvoiceByUserIdAndInvoiceId(
        user.id,
        invoice.id,
      );
    return client;
  }

  @ResolveField()
  async items(
    @Parent() invoice: InvoiceItemEntity,
    @GraphQLCurrentUser() user: { id: string },
    @Info() queryInfo,
  ) {
    const items =
      await this.invoicesService.getItemsOfInvoiceByUserIdAndInvoiceId(
        user.id,
        invoice.id,
      );
    return items;
  }

  @Mutation((returns) => Boolean)
  async createInvoice(
    @Args({ name: 'clientId', type: () => String }) clientId: string,
    @Args({ name: 'dateTS', type: () => String }) dateTS: string,
    @Args({ name: 'dueDateTS', type: () => String }) dueDateTS: string,
    @Args({
      name: 'items',
      type: () => [InlinedInvoiceItemInput],
    })
    items: InlinedInvoiceItemInput[],
    @GraphQLCurrentUser() user: { id: string },
  ) {
    await this.invoicesService.create(user.id, {
      clientId,
      dateTS,
      dueDateTS,
      items,
    });
    return true;
  }
}
