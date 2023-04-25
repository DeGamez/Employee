import { ApiProperty } from "@nestjs/swagger"

export class CreateEmployeeDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    name: string
    
    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    email: string
}
