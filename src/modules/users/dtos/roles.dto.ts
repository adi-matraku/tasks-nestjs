import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class RolesDto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
