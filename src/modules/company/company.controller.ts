import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CompanyDto } from "./dto/company.dto";

@ApiTags("회사")
@Controller("company")
export class CompanyController {
    @ApiOperation({
        summary: " 회사 목록",
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: 200,
        description: "회사 목록",
        type: CompanyDto,
    })
    getData(): CompanyDto {
        return {
            id: 1,
            name: "원티드",
            nation: "한국",
            location: "서울",
        };
    }
}
