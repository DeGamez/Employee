import { Loaded } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/mysql';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor( private readonly em: EntityManager){}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = new Company(createCompanyDto)

    await this.em.persistAndFlush(company);

    return company;
  }

  findAll(): Promise<Loaded<Company[]>> {
    return this.em.find(Company, {});
  }

  findOne(id: number) {
    return this.em.findOne(Company, id);
  }
  
  async modify(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Loaded<Company>>
  {
    if(updateCompanyDto.name === undefined || updateCompanyDto.address === undefined || updateCompanyDto.numberOfEmployees === undefined)
    {
      console.log(updateCompanyDto)
      throw new HttpException('Missing Paramter', 400)
    }
    if(typeof updateCompanyDto.name !== "string" || typeof updateCompanyDto.address !== "string" || typeof updateCompanyDto.numberOfEmployees !== "number")
    {
      throw new HttpException("Wrong Type", 400)
    }

    const foundCompany = await this.em.findOne(Company, id)

    if(!foundCompany)
    {
      throw new HttpException("No found Company!", 404)
    }

    const updatedCompany = Object.assign(foundCompany, updateCompanyDto);
    await this.em.persistAndFlush(updatedCompany);
    return updatedCompany;

  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Loaded<Company>> {
    if(!updateCompanyDto.name && !updateCompanyDto.address && !updateCompanyDto.numberOfEmployees)
    {
      throw new HttpException('Needs At Least One Parameter!', 400)
    }

    const foundCompany = await this.em.findOne(Company, id)

    if(!foundCompany)
    {
      throw new HttpException("No found Company!", 404)
    }

    const updatedCompany = Object.assign(foundCompany, updateCompanyDto);
    await this.em.persistAndFlush(updatedCompany);
    return updatedCompany;
  }

  async remove(id: number): Promise<void> {
    const company = await this.em.findOne(Company, id);
    if(!company)
    {
      throw new HttpException("No found Company!", 404)
    }
    await this.em.removeAndFlush(company)
  }
}
