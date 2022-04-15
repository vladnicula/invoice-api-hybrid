import { UseGuards } from "@nestjs/common";
import { Int, Args, Resolver, Query, Info, Parent, ResolveProperty } from "@nestjs/graphql";

import * as queryFields from 'graphql-fields'

import { GraphQLCurrentUser } from "src/auth/decorators/graphql-current-user.decorator";
import { GqlAuthGuard } from "src/auth/guards/graphql-jwt-auth.guard";
import { ClientsService } from "src/clients/clients.service";
import { SortOrder } from "src/common/entity/graphql-sort-order";
import { ClientEntity, ClientListInfo } from "./client.entity";

@UseGuards(GqlAuthGuard)
@Resolver(of => ClientEntity)
export class ClientsResolver {
  constructor(
    private readonly clientsService: ClientsService,
  ) {}

  @Query(returns => ClientEntity)
  async client(@GraphQLCurrentUser() user: {id: string}, @Args('id', { type: () => String }) id: string) {
    return await this.clientsService.findByUserIdAndId(user.id, id);
  }

  @Query(returns => ClientListInfo)
  async clients(
    @GraphQLCurrentUser() user: {id: string},
    @Info() queryInfo,
    @Args('limit', { type: () => Int, nullable: false, defaultValue: 10 }) limit: number,
    @Args('skip', { type: () => Int, nullable: false, defaultValue: 0 }) skip: number,
    @Args("sort", { type: () => SortOrder, nullable: true }) sort?: SortOrder,
    @Args("sortBy", { type: () => String, nullable: true }) sortBy?: string,
  ) {
    const clientSelectFields = Object.keys(queryFields(queryInfo).results) as (keyof ClientEntity)[]
    const clients = await this.clientsService.findByUserId(user.id, {
      limit, skip, sort, sortBy, selectFields: clientSelectFields
    });
    return clients;
  }
}
