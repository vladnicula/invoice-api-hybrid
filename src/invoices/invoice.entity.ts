import { ClientEntity } from 'src/clients/client.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class InvoiceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date: string;

  @Column()
  dueDate: string;

  @Column()
  items: string;

  @Column()
  total: string;

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
