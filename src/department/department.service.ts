import { Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor( private readonly em: EntityManager){}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = new Department(createDepartmentDto)

    await this.em.persistAndFlush(department);

    return department;
  }

  findAll(): Promise<Loaded<Department[]>> {
    return this.em.find(Department, {});
  }

  findOne(id: number) {
    return this.em.findOne(Department, id);
  }
  
  async modify(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Loaded<Department>>
  {
    if(updateDepartmentDto.name === undefined || updateDepartmentDto.address === undefined || updateDepartmentDto.city === undefined || updateDepartmentDto.state === undefined)
    {
      console.log(updateDepartmentDto)
      throw new HttpException('Missing Paramter', 400)
    }
    if(typeof updateDepartmentDto.name !== "string" || typeof updateDepartmentDto.address !== "string" || typeof updateDepartmentDto.city !== "string" || typeof updateDepartmentDto.state !== "string")
    {
      throw new HttpException("Wrong Type", 400)
    }

    const foundDepartment = await this.em.findOne(Department, id)

    if(!foundDepartment)
    {
      throw new HttpException("No found Department!", 404)
    }

    const updatedDepartment = Object.assign(foundDepartment, updateDepartmentDto);
    await this.em.persistAndFlush(updatedDepartment);
    return updatedDepartment;

  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Loaded<Department>> {
    if(!updateDepartmentDto.name && !updateDepartmentDto.address && !updateDepartmentDto.city && !updateDepartmentDto.state)
    {
      throw new HttpException('Needs At Least One Parameter!', 400)
    }

    const foundDepartment = await this.em.findOne(Department, id)

    if(!foundDepartment)
    {
      throw new HttpException("No found Department!", 404)
    }

    const updatedDepartment = Object.assign(foundDepartment, updateDepartmentDto);
    await this.em.persistAndFlush(updatedDepartment);
    return updatedDepartment;
  }

  async remove(id: number): Promise<void> {
    const department = await this.em.findOne(Department, id);
    if(!department)
    {
      throw new HttpException("No found Department!", 404)
    }
    await this.em.removeAndFlush(department)
  }
}
