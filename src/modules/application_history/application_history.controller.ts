import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApplicationHistoryService } from "./application_history.service";
import { ApplyApplicationDto } from "./dto/apply.dto";
import { ApplicationHistory } from "./application_history.entity";

@Controller("application-history")
export class ApplicationHistoryController {
    constructor(
        private readonly applicationHistoryService: ApplicationHistoryService,
    ) {}

    /**
     * 채용 공고 지원
     **/
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async applyApplication(@Body() applyDto: ApplyApplicationDto): Promise<{
        applyApplication: ApplicationHistory;
    }> {
        return this.applicationHistoryService.applyApplicationHistory(applyDto);
    }
}
