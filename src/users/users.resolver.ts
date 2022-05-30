import { Info, Args, Resolver, Query } from '@nestjs/graphql';
import * as queryFields from 'graphql-fields';
import { UserEntity } from './user.entity';
import { UsersService } from './users.service';

@Resolver((of) => UserEntity)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => UserEntity)
  async user(
    @Args('id', { type: () => String }) id: string,
    @Info() queryInfo: ParameterDecorator,
  ) {
    return await this.usersService.findOne(id);
  }

  @Query((returns) => [UserEntity])
  async users(@Info() queryInfo) {
    const selectFields = Object.keys(
      queryFields(queryInfo),
    ) as (keyof UserEntity)[];
    const users = await this.usersService.findAll({ selectFields });
    return users;
  }
}
