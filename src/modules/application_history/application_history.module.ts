import { Module } from "@nestjs/common";
import { ApplicationHistoryController } from "./application_history.controller";
import { ApplicationHistoryService } from "./application_history.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ApplicationHistory } from "./application_history.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ApplicationHistory])],
    controllers: [ApplicationHistoryController],
    providers: [ApplicationHistoryService],
})
export class ApplicationHistoryModule {}
