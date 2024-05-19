import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger, ValidationError, ValidationPipe} from "@nestjs/common";
import {ApiInterceptor, ValidationException} from "./common/api";
import {AllGlobalExceptionsFilter} from "./common/api/exception";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllGlobalExceptionsFilter(httpAdapterHost));
  app.useGlobalInterceptors(new ApiInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (validationErrors: ValidationError[] = []) => new ValidationException(validationErrors)
  }));
  await app.listen(3000);
}
bootstrap().then(() => {
  const logger = new Logger('Main Logger');
  logger.log('Server is started !!');
});


