import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import sqlite3 from 'sqlite3'

import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';


import configuration from './config/configuration';


import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/user.entity';
import { UsersModule } from './users/users.modules';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      driver: sqlite3,
      database: "invoice-app-db",
      synchronize: true,
      entities: [
        User
      ]
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
