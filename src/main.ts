import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SeedService } from "./modules/seed/seed.service";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // initialize seed data
    const seedService = app.get(SeedService);
    seedService.initializeSeedData();

    // middleware
    app.setGlobalPrefix("/api/v1");

    // Set global pipes
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    //  Initialize Swagger and APP
    if (process.env.NODE_ENV !== "prd") {
        const swaggerConfig = new DocumentBuilder()
            .setTitle("Wanted Preonboarding backend API")
            .setDescription("원티드 프리온보딩 백엔드 사전과제 김민지")
            .setVersion("1.0")
            .build();
        const document = SwaggerModule.createDocument(app, swaggerConfig);
        SwaggerModule.setup("api-docs", app, document);
    }

    // app listen
    await app.listen(process.env.PORT || 8000);
}

bootstrap();
