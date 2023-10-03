import { Controller, Get, HttpCode, HttpStatus, Query } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller("")
export class SearchController {
    constructor(private searchService: SearchService) {}

    /**
     * 채용 공고 검색
     **/
    @Get()
    @HttpCode(HttpStatus.OK)
    async searchPosting(@Query("search") query: string) {
        return this.searchService.searchPosting(query);
    }
}
