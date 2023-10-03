import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JobPosting } from "./job_posting.entity";
import { CreateJobPostingDTO } from "./dto/create-posting.dto";
import { Company } from "../company/company.entity";
import { EditJobPostingDTO } from "./dto/edit-posting.dto";
import { JobPostingResult } from "./types/posting.type";

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

    /**
     * 채용 공고 상세페이지 조회
     **/
    async getSingleJobPosting(id: number): Promise<JobPostingResult> {
        // find posting by id
        const posting = await this.jobPostingRepository
            .createQueryBuilder("posting")
            .leftJoinAndSelect("posting.company", "company")
            .where("posting.id = :id", { id })
            .getOne();

        // if posting does not exist
        if (!posting) {
            throw new BadRequestException(`Invalid posting id ${id}`);
        }

        // find other postings by company
        const otherPostings = (
            await this.jobPostingRepository
                .createQueryBuilder("posting")
                .where(
                    "posting.company.id = :companyId AND posting.id != :currentId",
                    {
                        companyId: posting.company.id,
                        currentId: posting.id,
                    },
                )
                .select("posting.id")
                .getMany()
        ).map((posting) => posting.id);

        // define result
        const result = {
            job_posting_id: posting.id,
            company_name: posting.company.name,
            company_nation: posting.company.nation,
            company_location: posting.company.location,
            job_position: posting.position,
            job_reward: posting.reward,
            job_skill: posting.skill,
            job_content: posting.content,
            job_other_postings_by_company:
                otherPostings.length > 0
                    ? otherPostings
                    : "No other postings by this company",
        };

        return result;
    }
}
