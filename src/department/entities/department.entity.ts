import { Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Company } from "src/company/entities/company.entity";
import { Employee } from "src/employee/entities/employee.entity";
import { CreateDepartmentDto } from "../dto/create-department.dto";

@Entity()
export class Department {
    constructor(createDepartmentDto: CreateDepartmentDto)
    {
        this.name = createDepartmentDto.name
        this.address = createDepartmentDto.address
        this.city = createDepartmentDto.city
        this.state = createDepartmentDto.state
    }

    @PrimaryKey({
        autoincrement: true
    })
    id!: number

    @Property({
        length: 64
    })
    name!: string

    @Property({
        length: 128
    })
    address!: string

    @Property({
        length: 128
    })
    city!: string

    @Property({
        length: 128
    })
    state!: string

    @OneToMany(() => Employee, (employee) => employee.department)
    employees: Employee[]

    @ManyToOne(() => Company, { nullable: true })
    company: Company
}
