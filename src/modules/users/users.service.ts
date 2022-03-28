import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './users.dto';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.create(
      {
        email: 'admin@yopmail.com',
        username: 'administrator',
        password: 'adminadmin',
      },
      true,
    ).catch(() => console.log('already admin'));
  }

  async create(data: CreateUserDto, isAdmin?: boolean) {
    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds);
    const newUser = this.userRepository.create({
      ...data,
      password: hashPassword,
      roles: isAdmin ? [Role.ADMIN] : [Role.USER],
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
      select: ['id', 'roles', 'password'],
    });
  }

  async findOne(userId: string) {
    return this.userRepository.findOne(userId);
  }
}
