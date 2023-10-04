import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class EditJobPostingDTO {
    @ApiProperty({
        example: "백엔드 주니어 개발자",
        description: "채용 포지션",
        required: true,
    })
    @IsOptional()
    @IsString()
    position: string;

    @ApiProperty({
        example: 1500000,
        description: "채용 보상금",
        required: true,
    })
    @IsOptional()
    @IsNumber()
    reward: number;

    @ApiProperty({
        example:
            "원티드랩에서 백엔드 주니어 개발자를 '적극' 채용합니다. 자격요건은..",
        description: "채용 내용",
        required: true,
    })
    @IsOptional()
    @IsString()
    content: string;

    @ApiProperty({
        example: "Nest.js",
        description: "사용 기술",
        required: true,
    })
    @IsOptional()
    @IsString()
    skill: string;
}
