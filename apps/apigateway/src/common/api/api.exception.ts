import {HttpException, ValidationError} from '@nestjs/common';
import {isNil} from "lodash";
import {ApiCodeResponse} from "./enum";
import {RpcException} from "@nestjs/microservices";
import * as grpc from "@grpc/grpc-js";

export class ApiException extends HttpException{
  constructor(code:ApiCodeResponse, status:number) {
    super({
      code: code,
      data: null,
      result: false
    }, status);
  }
}
export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    console.log(errors);
    super({
      code: ApiCodeResponse.PAYLOAD_IS_NOT_VALID,
      data: errors.map((e) => Object.values(e.constraints)).flat(),
      result: false
    }, 499);
  }
}

export abstract class BaseRpcException extends RpcException {
  protected constructor(status: grpc.status, message: string) {
    super({
      status: status,
      message: message
    });
  }
}
