import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column({ select: false })
  password: string;

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt?: Date;
}
