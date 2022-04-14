import { ClientEntity } from 'src/clients/client.entity';
import { InvoiceEntity } from 'src/invoices/invoice.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

export class UserCompanyEntityType {
  name: string;

  taxCode: string;

  iban: string;

  address: string;
}

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column('simple-json', { nullable: true })
  company: UserCompanyEntityType;

  @OneToMany((type) => ClientEntity, client => client.user)
  clients: ClientEntity[]

  @OneToMany((type) => InvoiceEntity, invoice => invoice.user)
  invoices: InvoiceEntity[]
}