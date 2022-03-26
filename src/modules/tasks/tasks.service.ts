import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './tasks.interface';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private autoNumber = 1;

  create(data: CreateTaskDto) {
    const newData = { ...data, id: this.autoNumber };
    this.tasks.push(newData);
    this.autoNumber = this.autoNumber + 1;
    return newData;
  }

  find() {
    return { data: this.tasks, count: this.tasks.length };
  }

  findById(taskId: number) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      return task;
    } else {
      throw new NotFoundException('Task is not found');
    }
  }

  update(taskId: number, data: UpdateTaskDto) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index >= 0) {
      const task = this.tasks[index];
      const newTask = { ...task, ...data };
      this.tasks = [
        ...this.tasks.slice(0, index),
        newTask,
        ...this.tasks.slice(index, -1),
      ];
      return newTask;
    } else {
      throw new NotFoundException('Task is not found');
    }
  }
}
