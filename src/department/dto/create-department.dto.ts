import { ApiProperty } from "@nestjs/swagger"

export class CreateDepartmentDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    name: string

    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    address: string

    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    city: string
    
    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    state: string
}
