import { ApiOkResponse, ApiNotFoundResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, FindTaskResponse } from './tasks.dto';
import { ExceptionResponse } from 'src/utils/error.dto';
import { Task } from 'src/entities/task.entity';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @ApiOkResponse({ type: Task })
  create(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }

  @Get()
  @ApiOkResponse({ type: FindTaskResponse })
  find() {
    return this.tasksService.find();
  }

  @Get(':id')
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ type: ExceptionResponse })
  findById(@Param('id') taskId: string) {
    return this.tasksService.findById(taskId);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Task })
  @ApiNotFoundResponse({ type: ExceptionResponse })
  async update(@Param('id') taskId: string, @Body() data: UpdateTaskDto) {
    return this.tasksService.update(taskId, data);
  }
}
