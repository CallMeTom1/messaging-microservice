import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import {CredentialI} from "../../../security/src/feature/common/security";
export class Token {
    tokenId: string;
    token: string;
    refreshToken: string;
    credential: CredentialI
}
