import { ApiProperty } from "@nestjs/swagger";

export class SearchDto {
    @ApiProperty({ example: 1 })
    job_posting_id: number;

    @ApiProperty({ example: "원티드랩" })
    company_name: string;

    @ApiProperty({
        example: "한국",
    })
    company_nation: string;

    @ApiProperty({ example: "서울" })
    company_location: string;

    @ApiProperty({ example: "백엔드 주니어 개발자" })
    job_position: string;

    @ApiProperty({ example: 1000000 })
    job_reward: number;

    @ApiProperty({
        example: "nest.js",
    })
    job_skill: string;
}
