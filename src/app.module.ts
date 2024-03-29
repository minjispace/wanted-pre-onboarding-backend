import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user/user.module";
import { CompanyModule } from "./modules/company/company.module";
import { JobPostingModule } from "./modules/job_posting/job_posting.module";
import { ApplicationHistoryModule } from "./modules/application_history/application_history.module";
import { User } from "./modules/user/user.entity";
import { Company } from "./modules/company/company.entity";
import { JobPosting } from "./modules/job_posting/job_posting.entity";
import { SearchModule } from "./modules/search/search.module";
import { ApplicationHistory } from "./modules/application_history/application_history.entity";
import { SeedService } from "./modules/seed/seed.service";
import { SeedModule } from "./modules/seed/seed.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Company]),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: process.env.NODE_ENV === "dev" ? true : false,
            entities: [User, Company, JobPosting, ApplicationHistory],
        }),
        UserModule,
        CompanyModule,
        JobPostingModule,
        ApplicationHistoryModule,
        SearchModule,
        SeedModule,
    ],
    providers: [SeedService],
})
export class AppModule {}
