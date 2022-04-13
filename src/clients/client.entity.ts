import { InvoiceEntity } from 'src/invoices/invoice.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
