import { ClientEntity } from 'src/clients/client.entity';
import { UserEntity } from 'src/users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  dueDate: string;

  @Column()
  items: string;

  @Column()
  total: string;

  @Column()
  @ManyToOne((type) => UserEntity, user => user.invoices, {
    onDelete: "CASCADE"
  })
  user: UserEntity;

  @Column()
  @ManyToOne((type) => ClientEntity, client => client.invoices, {
    onDelete: "CASCADE"
  })
  client: ClientEntity;
}
