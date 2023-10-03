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

@Controller("posting")
export class JobPostingsController {
    constructor(private jobPostingsService: JobPostingsService) {}

    /**
     * 채용 공고 등록
     **/
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createJobPosting(@Body() posting: CreateJobPostingDTO) {
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
    ) {
        return this.jobPostingsService.editJobPosting(posting, id);
    }

    /**
     * 채용 공고 삭제
     **/
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteJobPosting(@Param("id", ParseIntPipe) id: number) {
        return this.jobPostingsService.deleteJobPosting(id);
    }

    /**
     * 채용 공고 목록 조회
     **/
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllJobPostings() {
        return this.jobPostingsService.getAllJobPostings();
    }
}
