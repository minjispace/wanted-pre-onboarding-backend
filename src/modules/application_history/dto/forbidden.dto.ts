import { ApiProperty } from "@nestjs/swagger";

export class ForbiddenDto {
    @ApiProperty({
        example: 403,
    })
    statusCode: number;

    @ApiProperty({
        example: "You have already applied to this posting before",
    })
    message: string;

    @ApiProperty({
        example: "Forbidden",
    })
    error: string;
}
