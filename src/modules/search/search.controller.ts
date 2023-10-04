import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { SearchService } from "./search.service";
import { JobPosting } from "../job_posting/job_posting.entity";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SearchDto } from "./dto/search.dto";

@ApiTags("검색")
@Controller("")
export class SearchController {
    constructor(private searchService: SearchService) {}

    /**
     * 채용 공고 검색
     **/
    @ApiOperation({ summary: "채용공고 검색" })
    @ApiQuery({
        type: String,
        name: "search",
        required: true,
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: "성공",
        type: SearchDto,
    })
    async searchPosting(@Query("search") query: string): Promise<JobPosting[]> {
        return this.searchService.searchPosting(query);
    }
}
