import { ApiProperty } from "@nestjs/swagger";

export class BadRequestDto {
    @ApiProperty({
        example: 400,
    })
    statusCode: number;

    @ApiProperty({
        example: "Invalid user or job posting",
    })
    message: string;

    @ApiProperty({
        example: "Bad Request",
    })
    error: string;
}
