import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateTaskDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    title: string

    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    description: string
}
