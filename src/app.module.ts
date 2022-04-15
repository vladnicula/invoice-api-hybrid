import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { ThrottlerModule } from '@nestjs/throttler';

import configuration from './config/configuration';

import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ClientsModule } from './clients/clients.module';
import { InvoiceAppSeederModule } from './invoice-app-seeder/invoice-app-seeder.module';
import { join } from 'path';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // we use code first approach, driving graphql schemas by typescript
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    InvoicesModule,
    ClientsModule,
    InvoiceAppSeederModule,
  ],
  providers: [AppService],
})
export class AppModule {}
