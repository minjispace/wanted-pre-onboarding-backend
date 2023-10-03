import { Injectable } from "@nestjs/common";
import { JobPosting } from "../job_posting/job_posting.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(JobPosting)
        private postingsRepository: Repository<JobPosting>,
    ) {}
    /**
     * 채용 공고 검색
     **/
    async searchPosting(query) {
        return { query, msg: "search posting" };
    }
}
