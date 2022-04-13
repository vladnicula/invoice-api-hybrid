import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ThrottlerModule } from '@nestjs/throttler';

import configuration from './config/configuration';

import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ClientsModule } from './clients/clients.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    InvoicesModule,
    ClientsModule,
  ],
  providers: [AppService],
})
export class AppModule {}
