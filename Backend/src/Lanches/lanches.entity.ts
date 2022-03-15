import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lanches {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Lanche: string;
  
  @Column()
  Ingredientes: string
 
}