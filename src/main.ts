import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

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

    // app listen
    await app.listen(process.env.PORT || 8000);
}

bootstrap();
