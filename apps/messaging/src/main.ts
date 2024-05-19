import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {join} from 'path';
import {Logger} from "@nestjs/common";

import {MessagingModule} from "./messaging.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      MessagingModule,
      {
        transport: Transport.GRPC,
        options: {
          protoPath: join(__dirname, '../messaging.proto'),
          package: ['messaging'],
          url: '0.0.0.0:50051' // This line specifies the URL and port number

        },
      },
  );

  await app.listen();

}
bootstrap().then(() => {
  const logger = new Logger('Main Logger');
    logger.log('gRPC server is listening on port 50051');
});
