import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobPosting } from "./job_posting.entity";
import { CreateJobPostingDTO } from "./dto/create-posting.dto";
import { Company } from "../company/company.entity";
import { EditJobPostingDTO } from "./dto/edit-posting.dto";

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
            throw new BadRequestException(`Invalid company id ${companyId}`);
        }

        // create new posting
        const newposting = this.jobPostingRepository.create(posting);
        await this.jobPostingRepository.save(newposting);

        return { newposting };
    }

    /**
     * 채용 공고 수정
     **/
    async editJobPosting(
        posting: EditJobPostingDTO,
        id: number,
    ): Promise<JobPosting> {
        //  update posting
        const updatedPosting = await this.jobPostingRepository.update(
            id,
            posting,
        );

        // if posting does not exist
        if (updatedPosting.affected === 0) {
            throw new BadRequestException(`Invalid posting id ${id}`);
        }

        return await this.jobPostingRepository.findOne({ where: { id } });
    }

    /**
     * 채용 공고 삭제
     **/
    async deleteJobPosting(id: number): Promise<void> {
        const deletedPosting = await this.jobPostingRepository.delete(id);

        // if posting does not exist
        if (deletedPosting.affected === 0) {
            throw new BadRequestException(`Invalid posting id ${id}`);
        }
    }

    /**
     * 채용 공고 목록 조회
     **/
    async getAllJobPostings(): Promise<JobPosting[]> {
        const postings = await this.jobPostingRepository
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
            .getRawMany();
        return postings;
    }
}
