import { Test, TestingModule } from "@nestjs/testing";
import { Repository, SelectQueryBuilder } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JobPosting } from "./job_posting.entity";
import { CreateJobPostingDTO } from "./dto/create-posting.dto";
import { BadRequestException } from "@nestjs/common";
import { Company } from "../company/company.entity";
import { JobPostingsService } from "./job_posting.service";
import { EditJobPostingDTO } from "./dto/edit-posting.dto";

describe("JobPostingsService", () => {
    let service: JobPostingsService;
    let jobPostingRepository: Repository<JobPosting>;
    let companyRepository: Repository<Company>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                JobPostingsService,
                {
                    provide: getRepositoryToken(JobPosting),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Company),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<JobPostingsService>(JobPostingsService);
        jobPostingRepository = module.get<Repository<JobPosting>>(
            getRepositoryToken(JobPosting),
        );
        companyRepository = module.get<Repository<Company>>(
            getRepositoryToken(Company),
        );
    });

    /**
     * define test
     **/
    it("should be defined", () => {
        expect(service).toBeDefined();
    });

    /**
     * create job posting test
     **/
    describe("createJobPosting", () => {
        // create job posting dto
        const createJobPostingDto = {
            position: "백엔드 주니어 개발자",
            reward: 1000000,
            content:
                "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
            skill: "Nest.js",
        } as CreateJobPostingDTO;

        // create success
        it("should create a job posting", async () => {
            // Mock the company repository
            const mockCompany = new Company();
            jest.spyOn(companyRepository, "findOne").mockResolvedValue(
                mockCompany,
            );

            // Mock the job posting repository
            const mockJobPosting = new JobPosting();
            jest.spyOn(jobPostingRepository, "create").mockReturnValue(
                mockJobPosting,
            );
            jest.spyOn(jobPostingRepository, "save").mockResolvedValue(
                mockJobPosting,
            );

            const result = await service.createJobPosting(createJobPostingDto);
            expect(result.newposting).toEqual(mockJobPosting);
        });

        // create fail when company does not exist
        it("should throw BadRequestException when company does not exist", async () => {
            const createJobPostingDto = {
                position: "백엔드 주니어 개발자",
                reward: 1000000,
                content:
                    "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
                skill: "Nest.js",
                company: 1,
            } as CreateJobPostingDTO;

            // Mock the company repository to return null (company does not exist)
            jest.spyOn(companyRepository, "findOne").mockResolvedValue(null);

            try {
                await service.createJobPosting(createJobPostingDto);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
                expect(e.message).toBe(
                    `Invalid company id ${createJobPostingDto.company}`,
                );
            }
        });
    });

    /**
     * edit job posting test
     **/
    describe("editJobPosting", () => {
        const editJobPostingDto = {
            position: "수정된 백엔드 주니어 개발자",
            reward: 1000000,
            content:
                "수정된 원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은..",
            skill: "Nest.js",
        } as EditJobPostingDTO;

        // edit success
        it("should edit a job posting", async () => {
            const postId = 1; // Replace with a valid job posting ID

            // Mock the job posting repository
            const mockUpdatedPosting = new JobPosting();
            jest.spyOn(jobPostingRepository, "update").mockResolvedValue({
                affected: 1,
                raw: null,
                generatedMaps: null,
            });
            jest.spyOn(jobPostingRepository, "findOne").mockResolvedValue(
                mockUpdatedPosting,
            );

            const result = await service.editJobPosting(
                editJobPostingDto,
                postId,
            );

            expect(result).toEqual(mockUpdatedPosting);
        });

        // edit fail when posting does not exist
        it("should throw BadRequestException when posting does not exist", async () => {
            const postId = 1; // Replace with a non-existing job posting ID

            // Mock the job posting repository to indicate that no records were updated
            jest.spyOn(jobPostingRepository, "update").mockResolvedValue({
                affected: 0,
                raw: null,
                generatedMaps: null,
            });

            try {
                await service.editJobPosting(editJobPostingDto, postId);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
                expect(e.message).toBe(`Invalid posting id ${postId}`);
            }
        });
    });

    /**
     * delete job posting test
     **/
    describe("deleteJobPosting", () => {
        // delete success
        it("should delete a job posting", async () => {
            const postId = 1; // Replace with a valid job posting ID

            // Mock the job posting repository
            jest.spyOn(jobPostingRepository, "delete").mockResolvedValue({
                affected: 1,
                raw: null,
            });

            await service.deleteJobPosting(postId);
            // No exceptions should be thrown, and the function should complete successfully.
        });

        // delete fail when posting does not exist
        it("should throw BadRequestException when posting does not exist", async () => {
            const postId = 1; // Replace with a non-existing job posting ID

            // Mock the job posting repository to indicate that no records were deleted
            jest.spyOn(jobPostingRepository, "delete").mockResolvedValue({
                affected: 0,
                raw: null,
            });

            try {
                await service.deleteJobPosting(postId);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
                expect(e.message).toBe(`Invalid posting id ${postId}`);
            }
        });
    });

    /**
     * get all job postings
     * **/
    describe("getAllJobPostings", () => {
        // get all job postings success
        it("should return a list of job postings", async () => {
            // Mock the job posting repository to return a list of job postings
            const mockJobPostings: JobPosting[] = [
                {
                    id: 1,
                    position: "Software Engineer",
                    reward: 100000,
                    content: "Job content",
                    skill: "Programming",
                    company: new Company(),
                    applicationLists: [],
                },
                {
                    id: 2,
                    position: "Software Engineer",
                    reward: 100000,
                    content: "Job content",
                    skill: "Programming",
                    company: new Company(),
                    applicationLists: [],
                },
            ];
            jest.spyOn(
                jobPostingRepository,
                "createQueryBuilder",
            ).mockReturnValue({
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                select: jest.fn().mockReturnThis(),
                getRawMany: jest.fn().mockResolvedValue(mockJobPostings),
            } as unknown as SelectQueryBuilder<JobPosting>);

            const result = await service.getAllJobPostings();
            expect(result).toEqual(mockJobPostings);
        });
    });

    /**
     * get single job postings
     * **/
    describe("getSingleJobPosting", () => {
        // get single job posting success
        it("should return a single job posting", async () => {
            const postId = 1;

            // Mock the job posting repository to return a single job posting
            const mockJobPosting: JobPosting = {
                id: postId,
                position: "Software Engineer",
                reward: 10000,
                content: "Lorem ipsum dolor sit amet",
                skill: "JavaScript",
                company: new Company(),
                applicationLists: [],
            };

            jest.spyOn(
                jobPostingRepository,
                "createQueryBuilder",
            ).mockReturnValue({
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getOne: jest.fn().mockResolvedValue(mockJobPosting),
                getMany: jest.fn().mockResolvedValue([mockJobPosting]),
                select: jest.fn().mockReturnThis(),
            } as unknown as SelectQueryBuilder<JobPosting>);

            const result = await service.getSingleJobPosting(postId);
            expect(result).toEqual({
                job_posting_id: mockJobPosting.id,
                company_name: mockJobPosting.company.name,
                company_nation: mockJobPosting.company.nation,
                company_location: mockJobPosting.company.location,
                job_position: mockJobPosting.position,
                job_reward: mockJobPosting.reward,
                job_skill: mockJobPosting.skill,
                job_content: mockJobPosting.content,
                job_other_postings_by_company: [
                    mockJobPosting.id || "No other postings by this company",
                ],
            });
        });

        // get single job posting fail when posting does not exist
        it("should throw BadRequestException when posting does not exist", async () => {
            const postId = 1;

            // Mock the job posting repository to return null (posting does not exist)
            jest.spyOn(
                jobPostingRepository,
                "createQueryBuilder",
            ).mockReturnValue({
                leftJoinAndSelect: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                getOne: jest.fn().mockResolvedValue(null),
            } as unknown as SelectQueryBuilder<JobPosting>);

            try {
                await service.getSingleJobPosting(postId);
            } catch (e) {
                expect(e).toBeInstanceOf(BadRequestException);
                expect(e.message).toBe("Invalid posting id 1");
            }
        });
    });
});
