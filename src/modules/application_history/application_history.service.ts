import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ApplicationHistory } from "./application_history.entity";
import { Repository } from "typeorm";
import { ApplyApplicationDto } from "./dto/apply.dto";
import { User } from "../user/user.entity";
import { JobPosting } from "../job_posting/job_posting.entity";

@Injectable()
export class ApplicationHistoryService {
    constructor(
        @InjectRepository(ApplicationHistory)
        private applicationRepository: Repository<ApplicationHistory>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(JobPosting)
        private jobPostingRepository: Repository<JobPosting>,
    ) {}

    /**
     * 채용 공고 지원
     */
    async applyApplicationHistory(applyDto: ApplyApplicationDto): Promise<{
        applyApplication: ApplicationHistory;
    }> {
        const userId = applyDto.user as number;
        const jobPostingId = applyDto.job_posting as number;

        // check exist application history
        const existApplicationHistroy =
            await this.applicationRepository.findOne({
                where: {
                    user: {
                        id: userId,
                    },
                    job_posting: {
                        id: jobPostingId,
                    },
                },
            });

        // check exist user
        const existUser = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        // check exist job posting
        const existJobPosting = await this.jobPostingRepository.findOne({
            where: {
                id: jobPostingId,
            },
        });

        // if user or job posting is invalid
        if (!existUser || !existJobPosting) {
            throw new BadRequestException("Invalid user or job posting");
        }

        // if exist application history
        if (existApplicationHistroy) {
            throw new ForbiddenException(
                "You have already applied to this posting before",
            );
        }

        // apply application
        const applyApplication = this.applicationRepository.create(applyDto);
        await this.applicationRepository.save(applyApplication);

        return { applyApplication };
    }
}
