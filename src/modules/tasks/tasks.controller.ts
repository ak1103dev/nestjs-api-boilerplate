import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
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
import { CreateTaskDto, UpdateTaskDto, Task } from './tasks.dto';
import { ExceptionResponse } from 'src/utils/error.dto';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @ApiCreatedResponse({ type: Task })
  create(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }

  @Get()
  @ApiCreatedResponse({ type: [Task] })
  find() {
    return this.tasksService.find();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: Task })
  @ApiNotFoundResponse({ type: ExceptionResponse })
  findById(@Param('id', ParseIntPipe) taskId: number) {
    return this.tasksService.findById(taskId);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: Task })
  @ApiNotFoundResponse({ type: ExceptionResponse })
  async update(
    @Param('id', ParseIntPipe) taskId: number,
    @Body() data: UpdateTaskDto,
  ) {
    return this.tasksService.update(taskId, data);
  }
}
