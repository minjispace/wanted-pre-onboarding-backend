import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Company } from "src/modules/company/company.entity";

export class CreateJobPostingDTO {
    @ApiProperty({
        example: "백엔드 주니어 개발자",
        description: "채용 포지션",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    position: string;

    @ApiProperty({
        example: 1000000,
        description: "채용 보상금",
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    reward: number;

    @ApiProperty({
        example: "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
        description: "채용 내용",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({
        example: "Nest.js",
        description: "사용 기술",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    skill: string;

    @ApiProperty({
        example: 1,
        description: "채용 공고 회사 ID",
        required: true,
    })
    @IsNotEmpty()
    company: Partial<Company>;
}
