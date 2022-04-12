import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import sqlite3 from 'sqlite3'

import configuration from './config/configuration';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
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
