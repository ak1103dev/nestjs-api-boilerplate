import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.interface';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() data: Task) {
    return this.tasksService.create(data);
  }

  @Get()
  find() {
    return this.tasksService.find();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) taskId: number) {
    return this.tasksService.findById(taskId);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) taskId: number, @Body() data: Task) {
    return this.tasksService.update(taskId, data);
  }
}
