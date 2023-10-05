import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { SeedService } from "./seed.service";
import { User } from "../user/user.entity";
import { Company } from "../company/company.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("SeedService", () => {
    let seedService: SeedService;
    let userRepository: Repository<User>;
    let companyRepository: Repository<Company>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SeedService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(Company),
                    useClass: Repository,
                },
            ],
        }).compile();

        seedService = module.get<SeedService>(SeedService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
        companyRepository = module.get<Repository<Company>>(
            getRepositoryToken(Company),
        );
    });

    // define test
    it("should be defined", () => {
        expect(seedService).toBeDefined();
    });

    // initialize seed data
    describe("initializeSeedData", () => {
        it("should save user and company data to the database", async () => {
            const userData = seedService.getUsers();
            const companyData = seedService.getCompanies();

            // Mock the save function of userRepository and companyRepository
            userRepository.save = jest.fn().mockResolvedValue(userData);
            companyRepository.save = jest.fn().mockResolvedValue(companyData);

            await seedService.initializeSeedData();

            // Verify that save was called with the correct data
            expect(userRepository.save).toHaveBeenCalledWith(userData);
            expect(companyRepository.save).toHaveBeenCalledWith(companyData);
        });
    });
});
