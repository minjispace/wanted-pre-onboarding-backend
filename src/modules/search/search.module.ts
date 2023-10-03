import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JobPosting } from "../job_posting/job_posting.entity";

@Module({
    imports: [TypeOrmModule.forFeature([JobPosting])],
    controllers: [SearchController],
    providers: [SearchService],
})
export class SearchModule {}
