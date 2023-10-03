import { Module } from "@nestjs/common";
import { JobPosting } from "./job_posting.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobPostingsController } from "./job_posting.controller";
import { JobPostingsService } from "./job_posting.service";

@Module({
    imports: [TypeOrmModule.forFeature([JobPosting])],
    controllers: [JobPostingsController],
    providers: [JobPostingsService],
})
export class JobPostingModule {}
