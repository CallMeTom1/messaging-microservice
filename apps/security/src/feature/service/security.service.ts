import {HttpStatus, Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as grpc from '@grpc/grpc-js';
import {isNil} from "lodash";
import {Builder} from "builder-pattern";
import {ulid} from "ulid";
import {TokenService} from "./token.service";
import {Credential, RefreshTokenPayload, SignInPayload, SignsocialPayload, SignupPayload, Token} from "../data";
import {
  CredentialDeleteException,
  SignupException,
  SocialSignException,
  UserAlreadyExistException,
  UserNotFoundException
} from "../security.exception";
import {comparePassword, encryptPassword} from "./utils";
import {RpcException} from "@nestjs/microservices";
import {GrpcInfo} from "../../common/config/metadata/grpcInfo.metadata";
import {FitRpcException} from "../../common/config/exception/rcp.exception";

@Injectable()
export class SecurityService {
  //private readonly logger = new Logger(SecurityService.name);
  constructor(@InjectRepository(Credential) private readonly repository: Repository<Credential>,
              private readonly tokenService: TokenService) {
  }
  async detail(id: string) {
    const result = await this.repository.findOneBy({credentialId: id});
    if (!(isNil(result))) {
      return result;
    }
    throw new UserNotFoundException();
  }

  @GrpcInfo('signIn')
  async signIn(payload: SignInPayload, isAdmin: boolean) {
      const credential : Credential | null = await this.repository.findOneBy({username: payload.username, isAdmin});
      if (!credential || !await comparePassword(payload.password, credential.password)) {
        throw new FitRpcException('User not found', HttpStatus.NOT_FOUND);
      }
    return this.tokenService.getTokens(credential);
  }

  @GrpcInfo('signUp')
  async signup(payload: SignupPayload) {
    const result: Credential | null = await this.repository.findOneBy({username:
      payload.username});
    if (!isNil(result)) {
      throw new UserAlreadyExistException()
    }
    try {
      const encryptedPassword = await encryptPassword(payload.password);
      await this.repository.save(Builder<Credential>()
          .credentialId(ulid())
          .username(payload.username)
          .password(encryptedPassword)
          .mail(payload.mail)
          .build());

      const signInPayload: SignInPayload = {
        username: payload.username,
        password: payload.password,
        googleHash: "",
        facebookHash: "",
        socialLogin: false
      };
      return await this.signIn(signInPayload, false)
    } catch (e) {
      throw new SignupException();
    }
  }
  async signSocial(payload: SignsocialPayload){
    try {
      let result: Credential | null;

      if (payload.googleHash) {
        result = await this.repository.findOneBy({googleHash: payload.googleHash});
      }
      else if (payload.facebookHash) {
        result = await this.repository.findOneBy({facebookHash: payload.facebookHash});
      }
      if (!result) {
        const credentialBuilder = Builder<Credential>()
            .credentialId(ulid())
            .username(payload.username)
            .googleHash(payload.googleHash)
            .facebookHash(payload.facebookHash);
        if (payload.mail) {
          credentialBuilder.mail(payload.mail);
        } else {
          credentialBuilder.mail(null);
        }
        result = await this.repository.save(credentialBuilder.build());
      }
      return this.tokenService.getTokens(result);
    } catch(e) {
      throw new SocialSignException();
    }
  }

  async refresh(payload: RefreshTokenPayload) {
    return this.tokenService.refresh(payload);
  }

  async delete(id: string) {
    try {
      const detail = await this.detail(id);
      await this.tokenService.deleteFor(detail);
      await this.repository.remove(detail);
    } catch (e) {
      throw new CredentialDeleteException();
    }
  }

}