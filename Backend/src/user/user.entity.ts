import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column()
  accesslevel: string;
}