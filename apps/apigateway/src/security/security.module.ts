import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { SecurityService } from './security.service';
import { SecurityController } from './security.controller';
import { join } from 'path';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'security',
                transport: Transport.GRPC,
                options: {
                    package: 'security',
                    protoPath: join(__dirname, '../security.proto')
                },
            },
        ]),
    ],
    controllers: [SecurityController],
    providers: [SecurityService],
    exports: [SecurityService]
})
export class SecurityModule {}
