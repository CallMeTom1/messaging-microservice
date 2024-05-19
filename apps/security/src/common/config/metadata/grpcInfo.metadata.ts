import { applyDecorators, SetMetadata } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

export function GrpcInfo(code: string) {
    return applyDecorators(
        SetMetadata('grpcCode', code),
        GrpcMethod() // Assure que c'est bien un gRPC Method
    );
}
