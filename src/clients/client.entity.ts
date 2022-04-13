import { InvoiceEntity } from 'src/invoices/invoice.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @Column()
  @ManyToOne(() => UserEntity, user => user.clients, {
    onDelete: "CASCADE"
  })
  user: UserEntity;

  @Column()
  @OneToMany(() => InvoiceEntity, invocie => invocie.client)
  invoices: InvoiceEntity;
}
