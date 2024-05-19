import {Controller} from "@nestjs/common";
import {
    DeleteRequest, Empty, RefreshTokenRequest,
    SecurityServiceController,
    SecurityServiceControllerMethods,
    SignInRequest
} from "./common/security";
import {SecurityService} from "./service";
import {SignInPayload, SignupPayload} from "./data";
import {SignUpRequest} from "./common/security";

@Controller()
@SecurityServiceControllerMethods()
export class SecurityController implements SecurityServiceController{
    constructor(private readonly securityService: SecurityService) {}

    signIn(request: SignInRequest)   {
            const signInPayload: SignInPayload = {
                username: request.username,
                password: request.password,
                googleHash: request.googleHash,
                facebookHash: request.facebookHash,
                socialLogin: false
            };

            return this.securityService.signIn(signInPayload, false)
        }



    signUp(request: SignUpRequest) {
            const signUpPayload: SignupPayload = {
                username: request.username,
                password: request.password,
                mail: request.mail,
                googleHash: request.googleHash,
                facebookHash: request.facebookHash

            };
            return this.securityService.signup(signUpPayload)
        }


    delete(request: DeleteRequest): Empty {

        return this.securityService.delete(request.id) as Empty
    }

    refreshToken(request: RefreshTokenRequest) {
        return this.securityService.refresh(request)
    }
}