import {PassportStrategy} from "@nestjs/passport";
import {Profile, Strategy, VerifyCallback} from 'passport-google-oauth20';
import {Injectable} from "@nestjs/common";
import {ConfigKey, configManager} from "../../common/config";
import {encryptData} from "../service/utils";
import {SignsocialPayload} from "../data";
import {GoogleAuthException} from "../security.exception";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    //private readonly logger = new Logger(TokenService.name);
    constructor(
    ) {
        super({
            clientID: configManager.getValue(ConfigKey.GOOGLE_ID_CLIENT),
            clientSecret: configManager.getValue(ConfigKey.GOOGLE_SECRET_CODE),
            callbackURL: configManager.getValue(ConfigKey.GOOGLE_CALL_BACK_URL),
            passReqToCallback: true,
            scope: ['email', 'profile'],
        },);
    }

    async validate(req: Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
        try{
            const hashId = encryptData(profile.id)
            const email = profile.emails[0].value;
            const payload: SignsocialPayload = {
                username: profile.displayName,
                mail : email,
                googleHash: hashId,
                facebookHash: '',
            };
            done(null, payload);
        }
        catch(e) {
            throw new GoogleAuthException();
        }
    }
}





