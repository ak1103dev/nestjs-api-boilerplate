import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds);
    const newUser = this.userRepository.create({
      ...data,
      password: hashPassword,
    });
    const result = await this.userRepository.save(newUser);
    delete result.password;
    return result;
  }

  async find() {
    const [data, count] = await this.userRepository.findAndCount();
    return { data, count };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'password'],
    });
  }

  async findOne(userId: string) {
    return this.userRepository.findOne(userId);
  }
}
