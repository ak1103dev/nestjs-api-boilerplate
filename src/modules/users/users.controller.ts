import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, FindUserResponse } from './users.dto';
import { User } from 'src/entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { LoginDto } from '../auth/auth.dto';
import { Roles } from 'src/authorization/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/authorization/roles.guard';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  @ApiOkResponse({ type: User })
  async createUser(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: FindUserResponse })
  async findUser() {
    return this.usersService.find();
  }

  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    const { userId } = req.user;
    return this.usersService.findOne(userId);
  }
}
