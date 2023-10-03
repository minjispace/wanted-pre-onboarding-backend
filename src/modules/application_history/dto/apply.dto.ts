import { IsInt, IsNotEmpty } from "class-validator";
import { JobPosting } from "src/modules/job_posting/job_posting.entity";
import { User } from "src/modules/user/user.entity";

export class ApplyApplicationDto {
    @IsNotEmpty()
    @IsInt()
    user: Partial<User>;

    @IsNotEmpty()
    @IsInt()
    job_posting: Partial<JobPosting>;
}
