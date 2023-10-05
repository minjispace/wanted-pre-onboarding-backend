import { Test, TestingModule } from "@nestjs/testing";
import { SearchService } from "./search.service";
import { Repository } from "typeorm";
import { JobPosting } from "../job_posting/job_posting.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Company } from "../company/company.entity";

describe("SearchService", () => {
    let service: SearchService;
    let jobPostingsRepository: Repository<JobPosting>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SearchService,
                {
                    provide: getRepositoryToken(JobPosting),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<SearchService>(SearchService);
        jobPostingsRepository = module.get<Repository<JobPosting>>(
            getRepositoryToken(JobPosting),
        );
    });

    // define  test
    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    // search job posting test
    describe("searchPosting", () => {
        // search job posting success
        it("should return job postings matching the query", async () => {
            const query = "Software Engineer";

            // Mock the job postings repository to return matching job postings
            const mockJobPostings: JobPosting[] = [
                {
                    id: 1,
                    position: "Software Engineer",
                    reward: 10000,
                    content: "Lorem ipsum dolor sit amet",
                    skill: "JavaScript",
                    company: new Company(),
                    applicationLists: [],
                },
                {
                    id: 2,
                    position: "Senior Software Engineer",
                    reward: 12000,
                    content: "Lorem ipsum dolor sit amet",
                    skill: "Python",
                    company: new Company(),
                    applicationLists: [],
                },
            ];

            jest.spyOn(
                jobPostingsRepository,
                "createQueryBuilder",
            ).mockReturnValue({
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                orWhere: jest.fn().mockReturnThis(),
                setParameter: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue(mockJobPostings),
            } as any);

            const result = await service.searchPosting(query);
            expect(result).toEqual(mockJobPostings);
        });

        // empty array success if no matching job postings found
        it("should return an empty array if no matching job postings found", async () => {
            const query = "Nonexistent Position";

            // Mock the job postings repository to return an empty array
            jest.spyOn(
                jobPostingsRepository,
                "createQueryBuilder",
            ).mockReturnValue({
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                orWhere: jest.fn().mockReturnThis(),
                setParameter: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue([]),
            } as any);

            const result = await service.searchPosting(query);
            expect(result).toEqual([]);
        });
    });
});
