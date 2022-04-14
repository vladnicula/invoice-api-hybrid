import { UserEntity } from 'src/users/user.entity';
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
  
  @ManyToOne((type) => InvoiceEntity, invoice => invoice.items, {
    onDelete: "CASCADE"
  })
  invoice: InvoiceEntity;
  @Column()
  invoiceId: string;

  @ManyToOne(() => UserEntity, (user) => user.invoices, {
    onDelete: 'CASCADE'
  })
  user: UserEntity
  @Column()
  userId: string
}
