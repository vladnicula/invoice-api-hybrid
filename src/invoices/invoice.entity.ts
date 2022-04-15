import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { ClientEntity } from 'src/clients/client.entity';
import { UserEntity } from 'src/users/user.entity';
import { InvoiceItemEntity } from './invoice-item.entity';

@ObjectType()
@Entity()
export class InvoiceEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date: string;

  @Column()
  dueDate: string;


  @Column()
  total: number;

  // relations
  @OneToMany((type) => InvoiceItemEntity, (entity) => entity.invoice)
  items: InvoiceItemEntity[]

  @ManyToOne((type) => UserEntity, user => user.invoices, {
    onDelete: "CASCADE"
  })
  user: UserEntity;
  @Column()
  userId: string;

  @ManyToOne((type) => ClientEntity, client => client.invoices, {
    onDelete: "CASCADE"
  })
  client: ClientEntity;
  @Column()
  clientId: string;
}
