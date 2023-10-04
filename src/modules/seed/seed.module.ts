import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { Company } from "../company/company.entity";
import { SeedService } from "./seed.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Company]),
    ],
    providers: [SeedService],
})
export class SeedModule {}
