import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobPosting } from "./job_posting.entity";

@Injectable()
export class JobPostingsService {
    constructor(
        @InjectRepository(JobPosting)
        private jobPostingRepository: Repository<JobPosting>,
    ) {}

    /**
     * 채용 공고 등록
     **/
    async createJobPosting() {
        return "create job posting";
    }
}
