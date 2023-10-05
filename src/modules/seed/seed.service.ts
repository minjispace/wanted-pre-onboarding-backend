import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "../user/user.entity";
import { Repository } from "typeorm";
import { Company } from "../company/company.entity";
import { seedData } from "../../utils/seed-data";

@Injectable()
export class SeedService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Company)
        private readonly companyRepository: Repository<Company>,
    ) {}
    private readonly data = seedData;

    async initializeSeedData() {
        await this.userRepository.save(this.data.user);
        await this.companyRepository.save(this.data.company);
    }

    getUsers() {
        return this.data.user;
    }

    getCompanies() {
        return this.data.company;
    }
}
