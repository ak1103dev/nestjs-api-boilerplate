import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @ApiProperty({ readOnly: true })
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ nullable: true })
  description: string;

  @ApiProperty()
  @Column({ default: false })
  isDone: boolean;

  @ApiProperty({ readOnly: true })
  @CreateDateColumn({ type: 'datetime' })
  createdAt?: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({ type: 'datetime' })
  updatedAt?: Date;
}
