import { Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor( private readonly em: EntityManager){}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = new Employee(createEmployeeDto)

    await this.em.persistAndFlush(employee);

    return employee;
  }

  findAll(): Promise<Loaded<Employee[]>> {
    return this.em.find(Employee, {});
  }

  findOne(id: number) {
    return this.em.findOne(Employee, id);
  }
  
  async modify(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Loaded<Employee>>
  {
    if(updateEmployeeDto.name === undefined || updateEmployeeDto.email === undefined)
    {
      console.log(updateEmployeeDto)
      throw new HttpException('Missing Paramter', 400)
    }
    if(typeof updateEmployeeDto.name !== "string" || typeof updateEmployeeDto.email !== "string")
    {
      throw new HttpException("Wrong Type", 400)
    }

    const foundEmployee = await this.em.findOne(Employee, id)

    if(!foundEmployee)
    {
      throw new HttpException("No found Employee!", 404)
    }

    const updatedEmployee = Object.assign(foundEmployee, updateEmployeeDto);
    await this.em.persistAndFlush(updatedEmployee);
    return updatedEmployee;

  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Loaded<Employee>> {
    if(!updateEmployeeDto.name && !updateEmployeeDto.email)
    {
      throw new HttpException('Needs At Least One Parameter!', 400)
    }

    const foundEmployee = await this.em.findOne(Employee, id)

    if(!foundEmployee)
    {
      throw new HttpException("No found Employee!", 404)
    }

    const updatedEmployee = Object.assign(foundEmployee, updateEmployeeDto);
    await this.em.persistAndFlush(updatedEmployee);
    return updatedEmployee;
  }

  async remove(id: number): Promise<void> {
    const employee = await this.em.findOne(Employee, id);
    if(!employee)
    {
      throw new HttpException("No found employee!", 404)
    }
    await this.em.removeAndFlush(employee)
  }
}
