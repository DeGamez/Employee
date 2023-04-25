import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Department } from "src/department/entities/department.entity";
import { CreateCompanyDto } from "../dto/create-company.dto";

@Entity()
export class Company {
    constructor(createCompanyDto: CreateCompanyDto)
    {
        this.name = createCompanyDto.name
        this.address = createCompanyDto.address
        this.numberOfEmployees = createCompanyDto.numberOfEmployees
    }

    @PrimaryKey({
        autoincrement: true
    })
    id!: number

    @Property({
        length: 128
    })
    name!: string

    @Property({
        length: 256
    })
    address!: string

    @Property()
    numberOfEmployees!: number

    @OneToMany(() => Department, (department) => department.company)
    departments: Department[]

}
