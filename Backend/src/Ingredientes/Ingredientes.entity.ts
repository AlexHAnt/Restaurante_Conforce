import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredientes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  Ingrediente: string
  
  @Column('float')
  Preco: number
}