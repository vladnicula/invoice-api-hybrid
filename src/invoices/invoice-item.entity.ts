import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@ObjectType()
@Entity()
export class InvoiceItemEntity {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('float')
  price: number;

  // relations
  @ManyToOne((type) => InvoiceEntity, (invoice) => invoice, {
    onDelete: 'CASCADE',
  })
  invoice: InvoiceEntity;

  @Column()
  invoiceId: string;
}
