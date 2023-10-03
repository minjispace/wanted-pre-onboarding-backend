import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Company } from "src/modules/company/company.entity";

export class CreateJobPostingDTO {
    @IsNotEmpty()
    @IsString()
    position: string;

    @IsNotEmpty()
    @IsNumber()
    reward: number;

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsString()
    skill: string;

    @IsNotEmpty()
    company: Partial<Company>;
}
