import { ApiProperty } from "@nestjs/swagger";

export class JobPostingResultDTO {
    @ApiProperty({ example: 1 })
    job_posting_id: number;

    @ApiProperty({ example: "원티드랩" })
    company_name: string;

    @ApiProperty({ example: "한국" })
    company_nation: string;

    @ApiProperty({ example: "서울" })
    company_location: string;

    @ApiProperty({ example: "백엔드 주니어 개발자" })
    job_position: string;

    @ApiProperty({ example: 1500000 })
    job_reward: number;

    @ApiProperty({ example: "Nest.js" })
    job_skill: string;
}

export class JobSinglePostingResultDTO {
    @ApiProperty({ example: 1 })
    job_posting_id: number;

    @ApiProperty({ example: "원티드랩" })
    company_name: string;

    @ApiProperty({ example: "한국" })
    company_nation: string;

    @ApiProperty({ example: "서울" })
    company_location: string;

    @ApiProperty({ example: "백엔드 주니어 개발자" })
    job_position: string;

    @ApiProperty({ example: 1500000 })
    job_reward: number;

    @ApiProperty({ example: "Nest.js" })
    job_skill: string;

    @ApiProperty({
        example: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
    })
    job_content: string;

    @ApiProperty({
        oneOf: [
            { type: "array", example: [1, 2, 3] },
            { type: "string", example: "No other postings by this company" },
        ],
    })
    job_other_postings_by_company: number[] | string;
}
