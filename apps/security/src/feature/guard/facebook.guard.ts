import {AuthGuard} from "@nestjs/passport";
import {ExecutionContext, Injectable} from "@nestjs/common";

@Injectable()
export class FacebookGuard extends AuthGuard('facebook'){
    async canActivate(context:ExecutionContext){
        return (await super.canActivate(context)) as boolean;
    }
}