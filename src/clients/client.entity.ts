import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { InvoiceEntity } from 'src/invoices/invoice.entity';
import { UserEntity } from 'src/users/user.entity';

@ObjectType()
@Entity()
export class ClientEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  contactName: string;

  @Column()
  contactEmail: string;

  @Column()
  taxCode: string;

  @Column()
  iban: string;

  @Column()
  address: string;

  @ManyToOne((type) => UserEntity, user => user.clients, {
    onDelete: "CASCADE"
  })
  user: UserEntity;

  @Column()
  userId: string;

  @OneToMany((type) => InvoiceEntity, invocie => invocie.client)
  invoices: InvoiceEntity[];
}
