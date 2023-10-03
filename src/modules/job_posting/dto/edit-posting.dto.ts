import { IsNumber, IsOptional, IsString } from "class-validator";

export class EditJobPostingDTO {
    @IsOptional()
    @IsString()
    position: string;

    @IsOptional()
    @IsNumber()
    reward: number;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    skill: string;
}
