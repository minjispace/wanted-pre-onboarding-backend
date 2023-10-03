import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./modules/user/user.module";
import { CompanyModule } from "./modules/company/company.module";
import { JobPostingModule } from "./modules/job_posting/job_posting.module";
import { ApplicationHistoryModule } from "./modules/application_history/application_history.module";
import { User } from "./modules/user/user.entity";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // envFilePath: ".env",
        }),
        TypeOrmModule.forRoot({
            type: "mysql",
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: process.env.NODE_ENV === "dev" ? true : false,
            entities: [User],
        }),
        UserModule,
        CompanyModule,
        JobPostingModule,
        ApplicationHistoryModule,
    ],
})
export class AppModule {}
