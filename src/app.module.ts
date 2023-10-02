import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { CompanyModule } from "./modules/company/company.module";
import { JobPostingModule } from "./modules/job_posting/job_posting.module";
import { ApplicationHistoryModule } from "./modules/application_history/application_history.module";

@Module({
    imports: [
        UserModule,
        CompanyModule,
        JobPostingModule,
        ApplicationHistoryModule,
    ],
})
export class AppModule {}
