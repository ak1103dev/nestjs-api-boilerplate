import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ContainersModule } from './modules/containers/containers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: 'mysql://user:password@localhost:3306/test',
      entities: ['dist/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TasksModule,
    AuthModule,
    UsersModule,
    ContainersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
