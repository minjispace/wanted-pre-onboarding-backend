import { Body, Controller, Patch, Post } from "@nestjs/common";
import { JobPostingsService } from "./job_posting.service";
import { CreateJobPostingDTO } from "./dto/create-posting.dto";

@Controller("posting")
export class JobPostingsController {
    constructor(private jobPostingsService: JobPostingsService) {}

    /**
     * 채용 공고 등록
     **/
    @Post("/")
    async createJobPosting(@Body() posting: CreateJobPostingDTO) {
        return this.jobPostingsService.createJobPosting(posting);
    }
}
