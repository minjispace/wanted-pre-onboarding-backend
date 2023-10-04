import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";
import { JobPosting } from "src/modules/job_posting/job_posting.entity";
import { User } from "src/modules/user/user.entity";

export class ApplyApplicationDto {
    @ApiProperty({
        example: 1,
        description: "채용공고에 지원할 유저 id",
        required: true,
    })
    @IsNotEmpty()
    @IsInt()
    user: Partial<User>;

    @ApiProperty({
        example: 1,
        description: "지원할 채용공고 id",
        required: true,
    })
    @IsNotEmpty()
    @IsInt()
    job_posting: Partial<JobPosting>;
}
