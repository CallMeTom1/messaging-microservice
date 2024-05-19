import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Builder } from 'builder-pattern';
import {ulid} from "ulid";
import {Credential, RefreshTokenPayload, Token} from "../data";
import {ConfigKey, configManager} from "../../common/config";
import {TokenExpiredException, TokenGenerationException} from "../security.exception";

@Injectable()
export class TokenService {
  //private readonly logger = new Logger(TokenService.name);
  constructor(@InjectRepository(Token) private readonly repository: Repository<Token>,
              @InjectRepository(Credential) private readonly credentialRepository: Repository<Credential>,
              private jwtService: JwtService) {
  }

  async getTokens(credential: Credential): Promise<Token> | null {
    try {
      await this.deleteFor(credential)
      const payload = {sub: credential.credentialId};
      const token = await this.jwtService.signAsync(payload, {
        secret: configManager.getValue(ConfigKey.JWT_TOKEN_SECRET),
        expiresIn: configManager.getValue(ConfigKey.JWT_TOKEN_EXPIRE_IN)
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET),
        expiresIn: configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_EXPIRE_IN)
      });

      await this.repository.upsert(
        Builder<Token>()
            .tokenId(ulid())
            .token(token)
            .refreshToken(refreshToken)
            .credential(credential)
            .build(),
        ['credential']
      )

      return this.repository.findOneBy({token: token});

    } catch (e) {
      throw new TokenGenerationException();
    }
  }

  async deleteFor(credential: Credential): Promise<void> {
    await this.repository.delete({credential})
  }

  async refresh(payload: RefreshTokenPayload): Promise<Token> | null {
    try {
      const id = this.jwtService.verify(payload.refresh, {secret:
          configManager.getValue(ConfigKey.JWT_REFRESH_TOKEN_SECRET)}).sub;
      const credential = await this.credentialRepository.findOneBy({credentialId: id});
      return await this.getTokens(credential);
    } catch (e) {
      throw new TokenExpiredException();
    }
  }
}