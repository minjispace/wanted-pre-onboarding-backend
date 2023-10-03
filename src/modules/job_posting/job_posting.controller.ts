import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Patch,
    Post,
} from "@nestjs/common";
import { JobPostingsService } from "./job_posting.service";
import { CreateJobPostingDTO } from "./dto/create-posting.dto";
import { EditJobPostingDTO } from "./dto/edit-posting.dto";
import { JobPosting } from "./job_posting.entity";
import { JobPostingResult } from "./types/posting.type";

@Controller("posting")
export class JobPostingsController {
    constructor(private jobPostingsService: JobPostingsService) {}

    /**
     * 채용 공고 등록
     **/
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createJobPosting(@Body() posting: CreateJobPostingDTO): Promise<{
        newposting: JobPosting;
    }> {
        return this.jobPostingsService.createJobPosting(posting);
    }

    /**
     * 채용 공고 수정
     **/
    @Patch("/:id")
    @HttpCode(HttpStatus.OK)
    async editJobPosting(
        @Param("id", ParseIntPipe) id: number,
        @Body() posting: EditJobPostingDTO,
    ): Promise<JobPosting> {
        return this.jobPostingsService.editJobPosting(posting, id);
    }

    /**
     * 채용 공고 삭제
     **/
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteJobPosting(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<void> {
        return this.jobPostingsService.deleteJobPosting(id);
    }

    /**
     * 채용 공고 목록 조회
     **/
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllJobPostings(): Promise<JobPosting[]> {
        return this.jobPostingsService.getAllJobPostings();
    }

    /**
     * 채용 공고 상세페이지 조회
     **/
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getSingleJobPosting(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<JobPostingResult> {
        return this.jobPostingsService.getSingleJobPosting(id);
    }
}
