import { Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor( private readonly em: EntityManager){}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task(createTaskDto)

    await this.em.persistAndFlush(task);

    return task;
  }

  findAll(): Promise<Loaded<Task[]>> {
    return this.em.find(Task, {});
  }

  findOne(id: number) {
    return this.em.findOne(Task, id);
  }
  
  async modify(id: number, updateTaskDto: UpdateTaskDto): Promise<Loaded<Task>>
  {
    if(updateTaskDto.title === undefined || updateTaskDto.description === undefined)
    {
      console.log(updateTaskDto)
      throw new HttpException('Missing Paramter', 400)
    }
    if(typeof updateTaskDto.title !== "string" || typeof updateTaskDto.description !== "string")
    {
      throw new HttpException("Wrong Type", 400)
    }

    const foundTask = await this.em.findOne(Task, id)

    if(!foundTask)
    {
      throw new HttpException("No found Task!", 404)
    }

    const updatedTask = Object.assign(foundTask, updateTaskDto);
    await this.em.persistAndFlush(updatedTask);
    return updatedTask;

  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Loaded<Task>> {
    if(!updateTaskDto.title && !updateTaskDto.description)
    {
      throw new HttpException('Needs At Least One Parameter!', 400)
    }

    const foundTask = await this.em.findOne(Task, id)

    if(!foundTask)
    {
      throw new HttpException("No found Task!", 404)
    }

    const updatedTask = Object.assign(foundTask, updateTaskDto);
    await this.em.persistAndFlush(updatedTask);
    return updatedTask;
  }

  async remove(id: number): Promise<void> {
    const task = await this.em.findOne(Task, id);
    if(!task)
    {
      throw new HttpException("No found Task!", 404)
    }
    await this.em.removeAndFlush(task)
  }
}
