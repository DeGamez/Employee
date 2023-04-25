import { Entity, PrimaryKey, Property, ManyToOne, OneToMany } from "@mikro-orm/core";
import { Department } from "src/department/entities/department.entity";
import { Task } from "src/tasks/entities/task.entity";
import { CreateEmployeeDto } from "../dto/create-employee.dto";

@Entity()
export class Employee {
    constructor(createEmployeeDto: CreateEmployeeDto)
    {
        this.name = createEmployeeDto.name
        this.email = createEmployeeDto.email
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
    email!: string

    @OneToMany(() => Task, (task) => task.employee)
    tasks: Task[]

    @ManyToOne(() => Department, { nullable: true })
    department: Department

}
