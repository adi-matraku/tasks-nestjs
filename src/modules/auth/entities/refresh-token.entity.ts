import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_token')
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  refresh_token: string;
}
