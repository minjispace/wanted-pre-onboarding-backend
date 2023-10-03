import { Controller, Post } from "@nestjs/common";
import { JobPostingsService } from "./job_posting.service";

@Controller("posting")
export class JobPostingsController {
    constructor(private jobPostingsService: JobPostingsService) {}

    /**
     * 채용 공고 등록
     **/
    @Post("/")
    async createPosting() {
        return this.jobPostingsService.createJobPosting();
    }
}
