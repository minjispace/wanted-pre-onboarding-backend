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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BadRequestDto } from "./dto/bad-request.dto";
import {
    JobPostingResultDTO,
    JobSinglePostingResultDTO,
} from "./dto/get-all-posting.dto";

@ApiTags("채용 공고")
@Controller("posting")
export class JobPostingsController {
    constructor(private jobPostingsService: JobPostingsService) {}

    /**
     * 채용 공고 등록
     **/
    @ApiOperation({ summary: "채용 공고 등록" })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: 201,
        description: "성공",
        type: CreateJobPostingDTO,
    })
    @ApiResponse({
        status: 400,
        description: "Bad Request",
        type: BadRequestDto,
    })
    @ApiBody({
        type: CreateJobPostingDTO,
        description: "company ID : 1",
    })
    async createJobPosting(@Body() posting: CreateJobPostingDTO): Promise<{
        newposting: JobPosting;
    }> {
        return this.jobPostingsService.createJobPosting(posting);
    }

    /**
     * 채용 공고 수정
     **/
    @ApiOperation({ summary: "채용 공고 수정" })
    @Patch("/:id")
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: "성공",
        type: EditJobPostingDTO,
    })
    @ApiResponse({
        status: 400,
        description: "Bad Request",
        type: BadRequestDto,
    })
    @ApiBody({
        type: EditJobPostingDTO,
        description: "company ID : 1",
    })
    async editJobPosting(
        @Param("id", ParseIntPipe) id: number,
        @Body() posting: EditJobPostingDTO,
    ): Promise<JobPosting> {
        return this.jobPostingsService.editJobPosting(posting, id);
    }

    /**
     * 채용 공고 삭제
     **/
    @ApiOperation({ summary: "채용 공고 삭제" })
    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiResponse({
        status: 204,
        description: "No Content",
    })
    @ApiResponse({
        status: 400,
        description: "Bad Request",
        type: BadRequestDto,
    })
    async deleteJobPosting(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<void> {
        return this.jobPostingsService.deleteJobPosting(id);
    }

    /**
     * 채용 공고 목록 조회
     **/
    @ApiOperation({ summary: "채용 공고 목록 조회" })
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: "성공",
        type: JobPostingResultDTO,
    })
    async getAllJobPostings(): Promise<JobPosting[]> {
        return this.jobPostingsService.getAllJobPostings();
    }

    /**
     * 채용 공고 상세페이지 조회
     **/
    @ApiOperation({ summary: "채용 공고 상세페이지 조회" })
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: "성공",
        type: JobSinglePostingResultDTO,
    })
    @ApiResponse({
        status: 400,
        description: "Bad Request",
        type: BadRequestDto,
    })
    async getSingleJobPosting(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<JobPostingResult> {
        return this.jobPostingsService.getSingleJobPosting(id);
    }
}
