import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApplicationHistoryService } from "./application_history.service";
import { ApplyApplicationDto } from "./dto/apply.dto";
import { ApplicationHistory } from "./application_history.entity";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { BadRequestDto } from "./dto/bad-request.dto";
import { ForbiddenDto } from "./dto/forbidden.dto";

@ApiTags("지원 내역")
@Controller("application-history")
export class ApplicationHistoryController {
    constructor(
        private readonly applicationHistoryService: ApplicationHistoryService,
    ) {}

    /**
     * 채용 공고 지원
     **/
    @ApiOperation({ summary: "채용 공고 지원" })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({
        status: 201,
        description: "성공",
        type: ApplyApplicationDto,
    })
    @ApiResponse({
        status: 400,
        description: "Bad Request",
        type: BadRequestDto,
    })
    @ApiResponse({
        status: 403,
        description: "Forbidden",
        type: ForbiddenDto,
    })
    @ApiBody({
        type: ApplyApplicationDto,
        description: "유저 ID : 1, 채용공고 ID : API 확인",
    })
    async applyApplication(@Body() applyDto: ApplyApplicationDto): Promise<{
        applyApplication: ApplicationHistory;
    }> {
        return this.applicationHistoryService.applyApplicationHistory(applyDto);
    }
}
