import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
