import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Task } from 'src/entities/task.entity';

// export class Task {
//   @ApiProperty()
//   id: number;

//   @ApiProperty()
//   title: string;

//   @ApiPropertyOptional()
//   description?: string;

//   @ApiProperty()
//   isDone: boolean;
// }

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsBoolean()
  isDone: boolean;
}

export class UpdateTaskDto {
  @ApiPropertyOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  isDone: boolean;
}

export class FindTaskResponse {
  @ApiProperty({ readOnly: true, type: [Task] })
  data: Task[];

  @ApiProperty({ readOnly: true })
  count: number;
}
