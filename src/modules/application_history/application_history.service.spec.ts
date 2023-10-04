import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { BadRequestException, ForbiddenException } from "@nestjs/common";
import { ApplicationHistoryService } from "./application_history.service";
import { User } from "../user/user.entity";
import { JobPosting } from "../job_posting/job_posting.entity";
import { ApplicationHistory } from "./application_history.entity";
import { ApplyApplicationDto } from "./dto/apply.dto";

describe("ApplicationHistoryService", () => {
    let service: ApplicationHistoryService;
    let userRepository: Repository<User>;
    let jobPostingRepository: Repository<JobPosting>;
    let applicationRepository: Repository<ApplicationHistory>;

    // mock list repository
    const mockListsRepository = () => ({
        create: jest.fn().mockReturnValue({ job_posting: 1, user: 1 }),
        save: jest.fn(),
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ApplicationHistoryService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(JobPosting),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(ApplicationHistory),
                    useValue: mockListsRepository(),
                },
            ],
        }).compile();

        service = module.get<ApplicationHistoryService>(
            ApplicationHistoryService,
        );
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
        jobPostingRepository = module.get<Repository<JobPosting>>(
            getRepositoryToken(JobPosting),
        );
        applicationRepository = module.get<Repository<ApplicationHistory>>(
            getRepositoryToken(ApplicationHistory),
        );
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    it("should apply application if user and job posting are valid", async () => {
        const validUserId = 1; // 유효한 사용자 ID
        const validJobPostingId = 1; // 유효한 채용 공고 ID

        // 모킹된 userRepository, jobPostingRepository의 findOne 메서드 설정
        userRepository.findOne = jest
            .fn()
            .mockResolvedValue({ id: validUserId });
        jobPostingRepository.findOne = jest
            .fn()
            .mockResolvedValue({ id: validJobPostingId });
        applicationRepository.findOne = jest.fn().mockResolvedValue(null);

        // applyDto
        const applyDto = {
            user: validUserId,
            job_posting: validJobPostingId,
        } as ApplyApplicationDto;

        const result = await service.applyApplicationHistory(applyDto);

        // 예상 결과와 일치하는지 어설션 검사
        expect(result).toEqual({
            applyApplication: {
                user: validUserId,
                job_posting: validJobPostingId,
            },
        });
    });

    it("should throw BadRequestException if user or job posting is invalid", async () => {
        const invalidUserId = 999; // 유효하지 않은 사용자 ID
        const validJobPostingId = 1; // 유효한 채용 공고 ID

        userRepository.findOne = jest
            .fn()
            .mockResolvedValue({ id: invalidUserId });
        jobPostingRepository.findOne = jest
            .fn()
            .mockResolvedValue({ id: validJobPostingId });

        // 유효하지 않은 user ID

        try {
            await userRepository.findOne({
                where: {
                    id: invalidUserId,
                },
            });
            await jobPostingRepository.findOne({
                where: {
                    id: validJobPostingId,
                },
            });
        } catch (e) {
            // BadRequestException 예상

            expect(e).toBeInstanceOf(BadRequestException);
            expect(e.message).toBe("Invalid user or job posting");
        }
    });

    it("should throw ForbiddenException if application history exists", async () => {
        const validUserId = 1; // 유효한 사용자 ID
        const appliedJobPostingId = 1; // 이미 지원한 채용 공고 ID

        applicationRepository.findOne = jest.fn().mockResolvedValue({
            user: validUserId,
            job_posting: appliedJobPostingId,
        });

        try {
            await applicationRepository.findOne({
                where: {
                    user: {
                        id: validUserId,
                    },
                    job_posting: {
                        id: appliedJobPostingId,
                    },
                },
            });
        } catch (e) {
            // ForbiddenException 예상
            expect(e).toBeInstanceOf(ForbiddenException);
            expect(e.message).toBe(
                "You have already applied to this posting before",
            );
        }
    });
});
