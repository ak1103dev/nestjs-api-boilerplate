import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(data: CreateTaskDto) {
    const newItem = this.taskRepository.create(data);
    return this.taskRepository.save(newItem);
  }

  async find() {
    const [data, count] = await this.taskRepository.findAndCount({
      order: { createdAt: 'ASC' },
    });
    return { data, count };
  }

  async findById(taskId: string) {
    return this.taskRepository.findOneOrFail(taskId).catch(() => {
      throw new NotFoundException('Task is not found');
    });
  }

  async update(taskId: string, data: UpdateTaskDto) {
    const item = await this.taskRepository.findOneOrFail(taskId).catch(() => {
      throw new NotFoundException('Task is not found');
    });
    return this.taskRepository.save({ ...item, ...data });
  }
}
