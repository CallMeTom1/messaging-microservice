import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";
import {ConfigKey, configManager} from "../../common/config";
import {encryptData} from "../service/utils";
import {SignsocialPayload} from "../data";
import {FacebookAuthException} from "../security.exception";

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
    //private readonly logger = new Logger(FacebookStrategy.name);

    constructor() {
        super({
            clientID: configManager.getValue(ConfigKey.FACEBOOK_ID_CLIENT),
            clientSecret: configManager.getValue(ConfigKey.FACEBOOK_SECRET_CODE),
            callbackURL: configManager.getValue(ConfigKey.FACEBOOK_CALL_BACK_URL),
            passReqToCallback: true,
            profileFields: ['id', 'displayName', 'emails' ]
        });
    }
    async validate(req: Request, accessToken: string, refreshToken: string, profile: Profile, done : any): Promise<any> {
        try {
            const hashId = encryptData(profile.id);
            const email = profile.emails?.[0]?.value;
            const payload: SignsocialPayload = {
                username: profile.displayName,
                mail: email ?? '',
                googleHash: '',
                facebookHash: hashId,
            };
            done(null, payload);
        } catch (e) {
            done(e, null);
            throw new FacebookAuthException();
        }

    }
}
