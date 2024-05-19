import { RpcException } from '@nestjs/microservices';
import {MicroserviceCodeResponse} from "../../api";
import {HttpStatus, ValidationError} from "@nestjs/common";
import * as grpc from '@grpc/grpc-js';

export interface IRpcException {
    message: string;
    status: number;
}

export class FitRpcException extends RpcException implements IRpcException {
    constructor(message: string, statusCode: HttpStatus) {
        super(message);
        this.initStatusCode(statusCode);
    }
    public status: number;

    private initStatusCode(statusCode) {
        this.status = statusCode;
    }
}

export class ValidationException extends RpcException {
    constructor(errors: ValidationError[]) {
        console.log(errors);
        super({
            code : MicroserviceCodeResponse.PAYLOAD_IS_NOT_VALID,
            data: errors.map((e) => Object.values(e.constraints)).flat,
            result: false
        })
    }
}