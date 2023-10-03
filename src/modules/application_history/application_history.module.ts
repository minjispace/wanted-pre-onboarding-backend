import { Module } from "@nestjs/common";
import { ApplicationHistoryController } from "./application_history.controller";
import { ApplicationHistoryService } from "./application_history.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationHistory } from "./application_history.entity";
import { User } from "../user/user.entity";
import { JobPosting } from "../job_posting/job_posting.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ApplicationHistory]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([JobPosting]),
    ],
    controllers: [ApplicationHistoryController],
    providers: [ApplicationHistoryService],
})
export class ApplicationHistoryModule {}
