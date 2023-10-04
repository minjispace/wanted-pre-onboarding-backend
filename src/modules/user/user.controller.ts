import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserDto } from "./dto/user.dto";

@ApiTags("유저")
@Controller("user")
export class UserController {
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: "유저 목록",
    })
    @ApiResponse({
        status: 200,
        description: "유저 목록",
        type: UserDto,
    })
    getData(): UserDto {
        return {
            id: 1,
            name: "김민지",
        };
    }
}
