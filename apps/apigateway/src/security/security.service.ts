import {Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {
    DeleteRequest, Empty, RefreshTokenRequest,
    SECURITY_SERVICE_NAME,
    SecurityServiceClient,
    SignInRequest, SignUpRequest
} from "../../../security/src/feature/common/security";
import {ClientGrpc} from "@nestjs/microservices";
import {SignInPayload, SignupPayload} from "../../../security/src/feature";

@Injectable()
export class SecurityService implements OnModuleInit{
    private securityService : SecurityServiceClient;
    constructor(
        @Inject('security') private client : ClientGrpc) {}

    onModuleInit(): any {
        this.securityService =
            this.client.getService<SecurityServiceClient>(SECURITY_SERVICE_NAME)
    }

     signIn(request: SignInRequest)  {

        const signInPayload: SignInPayload = {
            username: request.username,
            password: request.password,
            googleHash: request.googleHash,
            facebookHash: request.facebookHash,
            socialLogin: false
        };

        return  this.securityService.signIn(signInPayload)

    }

     signUp(request : SignUpRequest)  {
        const signUpPayload: SignupPayload = {
            username: request.username,
            password: request.password,
            mail: request.mail,
            googleHash: request.googleHash,
            facebookHash: request.facebookHash
        };

        return this.securityService.signUp(signUpPayload)
    }

     delete(request: DeleteRequest) {

        return this.securityService.delete(request)
    }

     refreshToken(request: RefreshTokenRequest) {
        return this.securityService.refreshToken(request)
    }
}