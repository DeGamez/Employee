import { Entity, PrimaryKey, Property, ManyToOne } from "@mikro-orm/core";
import { Employee } from "src/employee/entities/employee.entity";
import { CreateTaskDto } from "../dto/create-task.dto";

@Entity()
export class Task {
    constructor(createTaskDto: CreateTaskDto)
    {
        this.title = createTaskDto.title
        this.description = createTaskDto.description
    }

    @PrimaryKey({
        autoincrement: true
    })
    id!: number

    @Property({
        length: 128
    })
    title!: string

    @Property({
        length: 256
    })
    description!: string

    @ManyToOne(() => Employee, {nullable: true})
    employee: Employee
}
