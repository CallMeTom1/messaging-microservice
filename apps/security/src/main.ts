import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {join} from 'path';
import {Logger, ValidationError, ValidationPipe} from "@nestjs/common";
import {SecurityModule} from "./security.module";
import {MicroserviceInterceptor} from "./common/api/microservice.interceptor";
import {GrpcExceptionFilter} from "./common/config/exception/rcp-exception.filter";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      SecurityModule,
      {
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../security.proto'),
          package: ['security']
        },
      },
  );

  await app.listen();

}
bootstrap().then(() => {
    const logger = new Logger('Main Logger');
    logger.log('Server is started !!');
});
