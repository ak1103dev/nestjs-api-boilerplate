import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ContainersController } from './containers.controller';
import { ContainersService } from './containers.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './storages',
    }),
  ],
  controllers: [ContainersController],
  providers: [ContainersService],
})
export class ContainersModule {}
