
import {MicroserviceCodeResponse} from "../common/api";
import { RpcException } from '@nestjs/microservices';
import { status as grpcStatus } from '@grpc/grpc-js';


export class NoTokenFoundedException extends RpcException {
  constructor() {
    super(MicroserviceCodeResponse.NO_TOKEN_FOUNDED);
  }
}
export class UserNotFoundException extends RpcException {
  constructor() {
    super(MicroserviceCodeResponse.USER_NOT_FOUND);
  }
}
export class TokenExpiredException extends RpcException {
  constructor() {
    super(MicroserviceCodeResponse.TOKEN_EXPIRED);
  }
}
export class SignupException extends RpcException {
  constructor() {
    super(MicroserviceCodeResponse.SIGNUP_ERROR);
  }
}
export class SigninException extends RpcException {
  constructor() {
    super(MicroserviceCodeResponse.SIGNIN_ERROR);
  }
}
export class CredentialDeleteException extends RpcException {
  constructor() {
    super(MicroserviceCodeResponse.CREDENTIAL_DELETE_ERROR);
  }
}

export class UserAlreadyExistException extends RpcException {
  constructor() {
    super({
      message: "The user already exists.",
      code: grpcStatus.ALREADY_EXISTS,
      data: false,
      // Vous pouvez ajouter d'autres détails ici si nécessaire
    });
  }
}


export class TokenGenerationException extends RpcException {
  constructor() {
    super(MicroserviceCodeResponse.TOKEN_GEN_ERROR);
  }
}

export class GoogleAuthException extends RpcException {
  constructor() {
    super(MicroserviceCodeResponse.GOOGLE_AUTH_ERROR);
  }
}
export class FacebookAuthException extends RpcException {
  constructor() {
    super(MicroserviceCodeResponse.FACEBOOK_AUTH_ERROR);
  }
}
export class SocialSignException extends RpcException {
  constructor() {
    super(MicroserviceCodeResponse.SOCIAL_SIGN_ERROR);
  }
}