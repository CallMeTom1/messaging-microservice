import {ConfigKey, configManager} from "./common/config";
import {Module} from "@nestjs/common";
import {JwtModule} from "@nestjs/jwt";
import {TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import {FacebookStrategy, GoogleStrategy, SecurityController, SecurityService, TokenService} from "./feature";
import {Credential} from "./feature";
import {Token} from "./feature";

@Module({
  imports: [
      TypeOrmModule.forRoot(configManager.getTypeOrmConfig()),
      TypeOrmModule.forFeature([Credential, Token]),
      JwtModule.register({
        global: true,
        secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
        signOptions: {expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN)},
      }),
      ],
  providers: [TokenService, SecurityService, GoogleStrategy, FacebookStrategy],
  exports: [SecurityService, GoogleStrategy, TokenService, FacebookStrategy],
  controllers: [SecurityController]
})
export class SecurityModule {
}