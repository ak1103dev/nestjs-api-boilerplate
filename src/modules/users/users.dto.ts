import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class FindUserResponse {
  @ApiProperty({ type: [User] })
  data: User[];

  @ApiProperty()
  count: number;
}
