import {Body, Controller, Delete, Param, Post} from "@nestjs/common";
import {SecurityService} from "./security.service";
import {
    DeleteRequest,
    RefreshTokenRequest,
    SignInRequest,
    SignUpRequest
} from "../../../security/src/feature/common/security";
import {catchError, throwError} from "rxjs";
import {RpcException} from "@nestjs/microservices";

@Controller('auth')
export class SecurityController {
    constructor(private readonly  securityService: SecurityService) {}

    @Post('signin')
    public signIn(@Body() request: SignInRequest)  {
        return this.securityService.signIn(request);
    }

    @Post('signup')
    public signUp(@Body() request: SignUpRequest) {
        return this.securityService.signUp(request)
    }

    @Post('refresh')
    public refresh(@Body() request: RefreshTokenRequest) {
        return this.securityService.refreshToken(request);
    }

    @Delete('delete/:id')
    public delete(@Body() request: DeleteRequest) {
        return this.securityService.delete(request);
    }
}






/*

 */