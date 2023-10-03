import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobPosting } from "./job_posting.entity";
import { CreateJobPostingDTO } from "./dto/create-posting.dto";
import { Company } from "../company/company.entity";

@Injectable()
export class JobPostingsService {
    constructor(
        @InjectRepository(JobPosting)
        private jobPostingRepository: Repository<JobPosting>,
        @InjectRepository(Company)
        private CompanyRepository: Repository<Company>,
    ) {}

    /**
     * 채용 공고 등록
     **/
    async createJobPosting(posting: CreateJobPostingDTO): Promise<{
        newposting: JobPosting;
    }> {
        const companyId = posting.company as number;

        // find company
        const isExistCompany = await this.CompanyRepository.findOne({
            where: { id: companyId },
        });

        // if company does not exist
        if (!isExistCompany) {
            throw new BadRequestException(
                `company does not exist with id ${companyId}`,
            );
        }

        // create new posting
        const newposting = this.jobPostingRepository.create(posting);
        await this.jobPostingRepository.save(newposting);

        return { newposting };
    }
}
