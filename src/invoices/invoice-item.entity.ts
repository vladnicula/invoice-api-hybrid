import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity()
export class InvoiceItemEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  description: string;
  
  @Column('float')
  price: number

  // relations
  @ManyToOne((type) => InvoiceEntity, invoice => invoice, {
    onDelete: "CASCADE"
  })
  invoice: InvoiceEntity;
  
  @Column()
  invoiceId: string;
}
