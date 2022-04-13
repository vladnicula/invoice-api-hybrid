import { ClientEntity } from 'src/clients/client.entity';
import { InvoiceEntity } from 'src/invoices/invoice.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @OneToMany(() => ClientEntity, client => client.user)
  clients: ClientEntity[]

  @Column()
  @OneToMany(() => InvoiceEntity, invoice => invoice.user)
  invoices: InvoiceEntity[]
}