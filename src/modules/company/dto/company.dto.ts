import { ApiProperty } from "@nestjs/swagger";

export class CompanyDto {
    @ApiProperty({ example: 1 })
    id: 1;

    @ApiProperty({ example: "원티드랩" })
    name: string;

    @ApiProperty({ example: "한국" })
    nation: string;

    @ApiProperty({ example: "서울" })
    location: string;
}
