import { HideField, Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { ClientEntity } from 'src/clients/client.entity';
import { InvoiceEntity } from 'src/invoices/invoice.entity';

@ObjectType()
export class UserCompanyEntityType {
  name: string;
  taxCode: string;
  iban: string;
  address: string;
}

@ObjectType()
@Entity()
export class UserEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  // @Field(type => String)
  @Column()
  firstName: string;

  // @Field(type => String)
  @Column()
  lastName: string;

  // @Field(type => String)
  @Column()
  email: string;

  // @Field(type => String)
  @Column()
  password: string;

  // @Field(type => UserCompanyEntityType)
  @Column('simple-json', { nullable: true })
  company: UserCompanyEntityType;

  @HideField()
  @OneToMany((type) => ClientEntity, client => client.user)
  clients: ClientEntity[]

  @HideField()
  @OneToMany((type) => InvoiceEntity, invoice => invoice.user)
  invoices: InvoiceEntity[]
}