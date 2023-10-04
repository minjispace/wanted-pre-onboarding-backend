import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ example: 1 })
    id: 1;

    @ApiProperty({ example: "김민지" })
    name: string;
}
