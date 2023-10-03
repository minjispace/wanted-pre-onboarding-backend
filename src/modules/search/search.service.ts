import { Injectable } from "@nestjs/common";
import { JobPosting } from "../job_posting/job_posting.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class SearchService {
    constructor(
        @InjectRepository(JobPosting)
        private jobPostingsRepository: Repository<JobPosting>,
    ) {}
    /**
     * 채용 공고 검색
     **/
    async searchPosting(query): Promise<JobPosting[]> {
        const searchedPostings = this.jobPostingsRepository
            .createQueryBuilder("posting")
            .leftJoinAndSelect("posting.company", "company")
            .select([
                "posting.id AS job_posting_id",
                "company.name AS company_name",
                "company.nation AS company_nation",
                "company.location AS company_location",
                "posting.position AS job_position",
                "posting.reward AS job_reward",
                "posting.skill AS job_skill",
            ])
            .orWhere("company.name Like :query")
            .orWhere("company.location Like :query")
            .orWhere("company.nation Like :query")
            .orWhere("posting.position Like :query")
            .orWhere("posting.skill Like :query")
            .setParameter("query", `%${query}%`)
            .getRawMany();

        return searchedPostings;
    }
}
