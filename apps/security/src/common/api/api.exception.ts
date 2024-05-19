import {HttpException, ValidationError} from '@nestjs/common';
import {MicroserviceCodeResponse} from "./enum";

export class ApiException extends HttpException{
  constructor(code:MicroserviceCodeResponse, status:number) {
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
      code: MicroserviceCodeResponse.PAYLOAD_IS_NOT_VALID,
      data: errors.map((e) => Object.values(e.constraints)).flat(),
      result: false
    }, 499);
  }
}

