import { ApiProperty } from "@nestjs/swagger"

export class CreateCompanyDto {
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
        type: Number,
        description: 'This is a required property'
    })
    numberOfEmployees: number
}
